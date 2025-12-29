
import extractZip from 'extract-zip'
import path from 'path'
import { validateCedula, validateRNC } from '../src'
import durstenfeldShuffle from './utils/durstenfeld-shuffle.util'

// Download link is having issues at the time, unable to fully test changes
const url = 'https://dgii.gov.do/app/WebApps/Consultas/RNC/DGII_RNC.zip'

const zipPath = 'tmp/dgii.zip'

console.log('Fetching ZIP...')
const response = await fetch(url)
await Bun.write(zipPath, response)

console.log('Extracting ZIP...')
await extractZip(zipPath, { dir: path.join(__dirname, '../../tmp') })

Bun.file(zipPath).delete()

let txtData = ''

const readStream = Bun.file('tmp/TMP/DGII_RNC.TXT').stream()

for await (const chunk of readStream) {
	txtData += new TextDecoder().decode(chunk)
}

console.log('Finished reading TXT.')
console.log('Filtering Cedulas/RNCs...')

const split = txtData.split(/\r?\n/).map((line) => line.split('|')[0]!)

const rncs = durstenfeldShuffle(split.filter(validateRNC)).slice(0, 1000)
const cedulas = durstenfeldShuffle(split.filter(validateCedula)).slice(0, 1000)

console.log('Writing Cedulas/RNCs to file')

await Promise.all([
	Bun.write('assets/cedulas.json', JSON.stringify(cedulas)),
	Bun.write('assets/rncs.json', JSON.stringify(rncs)),
])

console.log('Done!')
