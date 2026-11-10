import { createReadStream } from 'node:fs'
import path from 'node:path'
import { createInterface } from 'node:readline'
import extractZip from 'extract-zip'
import { formatCedula, formatRNC, validateRNC } from '../src'

// Download link is having issues at the time, but this script doesn't need to be run frequently anyway
const url = 'https://dgii.gov.do/app/WebApps/Consultas/RNC/DGII_RNC.zip'
const zipPath = 'tmp/dgii.zip'
const txtPath = 'tmp/DGII_RNC.TXT'

// How many IDs to collect; the first half of each list is kept raw, the second half formatted
const CEDULA_COUNT = 1000
const RNC_COUNT = 500

// Pass --skip-download to reuse an already extracted tmp/DGII_RNC.TXT
if (process.argv.includes('--skip-download')) {
	console.log(`Skipping download, reusing ${txtPath}`)
} else {
	console.log('Fetching ZIP...')
	const response = await fetch(url)
	if (!response.ok) {
		throw new Error(`Failed to download ${url}: ${response.status} ${response.statusText}`)
	}
	await Bun.write(zipPath, response)

	console.log('Extracting ZIP...')
	await extractZip(zipPath, { dir: path.resolve('.') })

	await Bun.file(zipPath).delete()
}

console.log('Filtering Cedulas/RNCs...')

const rncs: string[] = []
const cedulas: string[] = []

// The file is ~760k lines (ISO-8859-1, CRLF) but only a few thousand are needed,
// so read it line by line and stop as soon as both lists are full.
const input = createReadStream(txtPath, { encoding: 'latin1' })
const lines = createInterface({ input, crlfDelay: Infinity })

for await (const line of lines) {
	const id = line.split('|', 1)[0]

	if (!id || !validateRNC(id)) continue

	if (id.length === 11 && cedulas.length < CEDULA_COUNT) {
		cedulas.push(cedulas.length < CEDULA_COUNT / 2 ? id : formatCedula(id))
	} else if (id.length === 9 && rncs.length < RNC_COUNT) {
		rncs.push(rncs.length < RNC_COUNT / 2 ? id : formatRNC(id))
	}

	if (cedulas.length >= CEDULA_COUNT && rncs.length >= RNC_COUNT) break
}

lines.close()
input.destroy()

if (cedulas.length < CEDULA_COUNT || rncs.length < RNC_COUNT) {
	throw new Error(
		`Not enough IDs in ${txtPath}: found ${cedulas.length}/${CEDULA_COUNT} cedulas and ${rncs.length}/${RNC_COUNT} RNCs`,
	)
}

console.log('Writing Cedulas/RNCs to JSON files...')

await Promise.all([
	Bun.write('assets/rncs.json', JSON.stringify(rncs)),
	Bun.write('assets/cedulas.json', JSON.stringify(cedulas)),
])

console.log('Done!')
