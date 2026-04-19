export const NCFTypes = {
	'01': 'Factura de Crédito Fiscal',
	'02': 'Factura de Consumo',
	'03': 'Nota de Débito',
	'04': 'Nota de Crédito',
	'11': 'Comprobante de Compras',
	'12': 'Registro Único de Ingresos',
	'13': 'Comprobante para Gastos Menores',
	'14': 'Comprobante para Regímenes Especiales',
	'15': 'Comprobante Gubernamental',
	'16': 'Comprobante para Exportaciones',
	'17': 'Comprobante para Pagos al Exterior',
	'31': 'Factura de Crédito Fiscal Electrónica',
	'32': 'Factura de Consumo Electrónica',
	'33': 'Nota de Débito Electrónica',
	'34': 'Nota de Crédito Electrónica',
	'41': 'Comprobante Electrónico de Compras',
	'43': 'Comprobante Electrónico para Gastos Menores',
	'44': 'Comprobante Electrónico para Regímenes Especiales',
	'45': 'Comprobante Electrónico Gubernamental',
} as const

export type NCFTypeCode = keyof typeof NCFTypes
