
import extractZip from 'extract-zip'
import path from 'path'
import { formatCedula, formatRNC, validateRNC } from '../src'

// Download link is having issues at the time, but this script doesn't need to be run frequently anyway
const url = 'https://dgii.gov.do/app/WebApps/Consultas/RNC/DGII_RNC.zip'
const zipPath = 'tmp/dgii.zip'

console.log('Fetching ZIP...')
const response = await fetch(url)
await Bun.write(zipPath, response)

console.log('Extracting ZIP...')
await extractZip(zipPath, { dir: path.resolve('.') })

Bun.file(zipPath).delete()

let rawTxt = ''

console.log('Reading TXT...')
const readStream = Bun.file('tmp/DGII_RNC.TXT').stream()

for await (const chunk of readStream) {
	rawTxt += new TextDecoder().decode(chunk)
}

console.log('Filtering Cedulas/RNCs...')

const split = rawTxt.split(/\r?\n/).map((line) => line.split('|')[0])

const rncs: string[] = []
const cedulas: string[] = []

for (const id of split) {
	if (cedulas.length >= 1000 && rncs.length >= 500) break

	if (!validateRNC(id)) continue
	
	if (id.length === 11 && cedulas.length < 1000) {
		if (cedulas.length < 500)
			cedulas.push(id)
		else
			cedulas.push(formatCedula(id))
	} else if (id.length === 9 && rncs.length < 500) {
		if (rncs.length < 250)
			rncs.push(id)
		else
			rncs.push(formatRNC(id))
	}
}

console.log('Writing Cedulas/RNCs to JSON files...')

await Promise.all([
	Bun.write('assets/rncs.json', JSON.stringify(rncs)),
	Bun.write('assets/cedulas.json', JSON.stringify(cedulas)),
])

console.log('Done!')
