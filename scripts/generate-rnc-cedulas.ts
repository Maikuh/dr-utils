/*
dr-utils: Utilities relevant to the Dominican Republic
Copyright (C) 2021  Miguel Araujo

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

/* eslint-disable import/no-extraneous-dependencies */
import extractZip from 'extract-zip'
import got from 'got'
import fs from 'fs/promises'
import { pipeline, finished } from 'stream/promises'
import path from 'path'
import { createReadStream, createWriteStream } from 'fs'
import { validateCedula, validateRNC } from '../src'
import durstenfeldShuffle from '../src/utils/durstenfeld-shuffle.util'

const url = 'https://www.dgii.gov.do/app/WebApps/Consultas/RNC/DGII_RNC.zip'

async function start() {
  const zipPath = 'tmp/dgii.zip'

  console.log('Fetching ZIP...')
  await pipeline(got.stream(url), createWriteStream(zipPath))

  console.log('Extracting ZIP...')
  await extractZip(zipPath, { dir: path.join(__dirname, '../tmp') })

  await fs.unlink(zipPath)

  let txtData!: string

  await finished(
    createReadStream('tmp/TMP/DGII_RNC.TXT').on('data', (data) => {
      txtData += data
    }),
  )

  console.log('Finished reading TXT.')
  console.log('Filtering Cedulas/RNCs...')

  const split = txtData.split(/\r?\n/).map((line) => line.split('|')[0])

  const rncs = durstenfeldShuffle(split.filter(validateRNC)).slice(0, 1000)
  const cedulas = durstenfeldShuffle(split.filter(validateCedula)).slice(0, 1000)

  console.log('Writing Cedulas/RNCs to file')

  await Promise.all([
    fs.writeFile('assets/cedulas.json', JSON.stringify(cedulas)),
    fs.writeFile('assets/rncs.json', JSON.stringify(rncs)),
  ])

  console.log('Done!')
}

start()
