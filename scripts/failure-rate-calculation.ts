import { validateRNC } from '../src/validators'

const readStream = Bun.file('tmp/DGII_RNC.TXT').stream()

let rawTxt = ''

for await (const chunk of readStream) {
    rawTxt += new TextDecoder().decode(chunk)
}

const split = rawTxt.split(/\r?\n/).map((line) => line.split('|')[0])

let validCedulas = 0
let validRncs = 0
let invalidCedulas = 0
let invalidRncs = 0

for (const id of split) {
    const isValid = validateRNC(id)

    if (id.length === 11)
        isValid ? validCedulas++ : invalidCedulas++
    else
        isValid ? validRncs++ : invalidRncs++
}

console.log('Valid Cedulas:', validCedulas)
console.log('Invalid Cedulas:', invalidCedulas)
console.log('Valid RNCs:', validRncs)
console.log('Invalid RNCs:', invalidRncs)
console.log('Total Rows Processed:', split.length)

console.log('\nPercentage of valid Cedulas:', ((validCedulas / (validCedulas + invalidCedulas)) * 100).toFixed(2) + '%')
console.log('Percentage of valid RNCs:', ((validRncs / (validRncs + invalidRncs)) * 100).toFixed(2) + '%')