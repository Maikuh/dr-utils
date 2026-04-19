import { readFileSync } from 'node:fs'
import { validateCedula } from '../src/validators/cedula.validator'
import { validateNCF } from '../src/validators/ncf.validator'
import { validatePhoneNumber } from '../src/validators/phone.validator'
import { validatePlate } from '../src/validators/plate.validator'
import { validateRNC } from '../src/validators/rnc.validator'

const cedulas: string[] = JSON.parse(readFileSync('assets/cedulas.json', 'utf-8'))
const rncs: string[] = JSON.parse(readFileSync('assets/rncs.json', 'utf-8'))
const phones: string[] = JSON.parse(readFileSync('assets/phone-numbers.json', 'utf-8'))

const SAMPLE_CEDULAS = cedulas.slice(0, 1000)
const SAMPLE_RNCS = rncs.slice(0, 1000)
const SAMPLE_PHONES = phones.slice(0, 1000)

const SAMPLE_NCFS = Array.from({ length: 1000 }, (_, i) =>
	`B01${String(i + 1).padStart(8, '0')}`,
)

const SAMPLE_PLATES = Array.from({ length: 1000 }, (_, i) =>
	`A${String(i + 1).padStart(6, '0')}`,
)

function bench(name: string, fn: () => void, iterations = 5): void {
	// warm-up
	fn()
	fn()

	const times: number[] = []
	for (let i = 0; i < iterations; i++) {
		const start = performance.now()
		fn()
		times.push(performance.now() - start)
	}
	const avg = times.reduce((a, b) => a + b, 0) / times.length
	console.log(`${name}: avg ${avg.toFixed(3)}ms over ${iterations} runs`)
}

bench('validateCedula × 1000', () => {
	for (const c of SAMPLE_CEDULAS) validateCedula(c)
})

bench('validateRNC × 1000', () => {
	for (const r of SAMPLE_RNCS) validateRNC(r)
})

bench('validateNCF × 1000', () => {
	for (const n of SAMPLE_NCFS) validateNCF(n)
})

bench('validatePhoneNumber × 1000', () => {
	for (const p of SAMPLE_PHONES) validatePhoneNumber(p)
})

bench('validatePlate × 1000', () => {
	for (const p of SAMPLE_PLATES) validatePlate(p)
})
