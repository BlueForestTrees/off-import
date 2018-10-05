const debug = require('debug')('api:off-import')

const regex = /^ *(\d+) *([a-zA-Z]+)( +e? *)?$/

const gs = {
    "mg": "Mass",
    "g": "Mass",
    "G": "Mass",
    "gr": "Mass",
    "gramme": "Mass",
    "grammes": "Mass",
    "grammi": "Mass",
    "grames": "Mass",
    "gram": "Mass",
    "grams": "Mass",
    "grs": "Mass",
    "kg": "Mass",
    "kilo": "Mass",
    "Kg": "Mass",
    "KG": "Mass",
    "oz": "Mass",
    "Oz": "Mass",
    "OZ": "Mass",

    "L": "Volu",
    "l": "Volu",
    "litre": "Volu",
    "liter": "Volu",
    "Liter": "Volu",
    "Liters": "Volu",
    "littes": "Volu",
    "litres": "Volu",
    "Litres": "Volu",
    "Litre": "Volu",
    "litro": "Volu",
    "dl": "Volu",
    "cl": "Volu",
    "CL": "Volu",
    "Cl": "Volu",
    "cL": "Volu",
    "ml": "Volu",
    "mL": "Volu",
    "ML": "Volu",
}

const coefs = {
    "mg": 0.000001,
    "g": 0.001,
    "G": 0.001,
    "gr": 0.001,
    "gramme": 0.001,
    "grammes": 0.001,
    "grammi": 0.001,
    "grames": 0.001,
    "gram": 0.001,
    "grams": 0.001,
    "grs": 0.001,
    "kg": 1,
    "kilo": 1,
    "Kg": 1,
    "KG": 1,
    "oz": 0.028349523125,
    "Oz": 0.028349523125,
    "OZ": 0.028349523125,

    "L": 0.001,
    "l": 0.001,
    "litre": 0.001,
    "liter": 0.001,
    "Liter": 0.001,
    "Liters": 0.001,
    "littes": 0.001,
    "litres": 0.001,
    "Litres": 0.001,
    "Litre": 0.001,
    "litro": 0.001,
    "dl": 0.0001,
    "cl": 0.00001,
    "CL": 0.00001,
    "Cl": 0.00001,
    "cL": 0.00001,
    "ml": 0.000001,
    "mL": 0.000001,
    "ML": 0.000001,
}

export const toBqt = rawQt => {
    const match = regex.exec(rawQt)
    if (match) {
        const qt = Number(match[1])
        const unit = match[2]
        const coef = coefs[unit]
        if (coef != null) {
            return {bqt: qt * coef, g: gs[unit]}
        }
    }
}