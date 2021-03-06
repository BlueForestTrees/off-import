import ENV from './env'
import {getRandomColor} from "./color"

export default () => ENV.DB.facetEntry.bulkWrite(
    [
        {updateOne: {filter: {externId: "energy"}, update: {$set: {name: "Energie", color: getRandomColor(), g: "Ene1", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "proteins"}, update: {$set: {name: "Protéine", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "casein"}, update: {$set: {name: "Caséine", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "serum-proteins"}, update: {$set: {name: "Protéine du sérum", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "nucleotides"}, update: {$set: {name: "Nucléotide", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "carbohydrates"}, update: {$set: {name: "Glucide", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "sugars"}, update: {$set: {name: "Sucre", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "sucrose"}, update: {$set: {name: "Saccharose", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "glucose"}, update: {$set: {name: "Glucose", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "fructose"}, update: {$set: {name: "Fructose", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "lactose"}, update: {$set: {name: "Lactose", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "maltose"}, update: {$set: {name: "Maltose", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "maltodextrins"}, update: {$set: {name: "Maltodextrine", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "starch"}, update: {$set: {name: "Amidon", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "polyols"}, update: {$set: {name: "Polyol", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "fat"}, update: {$set: {name: "Graisse", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "saturated-fat"}, update: {$set: {name: "Acide gras saturé", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "butyric-acid"}, update: {$set: {name: "Acide butyrique", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "caproic-acid"}, update: {$set: {name: "Acide caproïque", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "caprylic-acid"}, update: {$set: {name: "Acide caprylique", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "capric-acid"}, update: {$set: {name: "Acide caprique", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "lauric-acid"}, update: {$set: {name: "Acide laurique", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "myristic-acid"}, update: {$set: {name: "Acide myristique", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "palmitic-acid"}, update: {$set: {name: "Acide palmitique", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "stearic-acid"}, update: {$set: {name: "Acide stéarique", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "arachidic-acid"}, update: {$set: {name: "Acide arachidique", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "behenic-acid"}, update: {$set: {name: "Acide béhénique", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "lignoceric-acid"}, update: {$set: {name: "Acide lignocérique", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "cerotic-acid"}, update: {$set: {name: "Acide cérotique", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "montanic-acid"}, update: {$set: {name: "Acide motanique", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "melissic-acid"}, update: {$set: {name: "Acide mélissique", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "monounsaturated-fat"}, update: {$set: {name: "Graisse monoinsaturée", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "polyunsaturated-fat"}, update: {$set: {name: "Graisse polyinsaturée", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "omega-3-fat"}, update: {$set: {name: "Omegas 3", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "alpha-linolenic-acid"}, update: {$set: {name: "Acide alpha-linolénique", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "eicosapentaenoic-acid"}, update: {$set: {name: "Acide eicosapentaénoïque", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "docosahexaenoic-acid"}, update: {$set: {name: "Acide docosahexaénoïque", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "omega-6-fat"}, update: {$set: {name: "Omegas 6", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "linoleic-acid"}, update: {$set: {name: "Acide linoléique", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "arachidonic-acid"}, update: {$set: {name: "Acide arachidonique", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "gamma-linolenic-acid"}, update: {$set: {name: "Acide gamma-linolénique", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "dihomo-gamma-linolenic-acid"}, update: {$set: {name: "Acide dihomo-gamma-linolénique", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "omega-9-fat"}, update: {$set: {name: "Oméga 9", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "oleic-acid"}, update: {$set: {name: "Acide oléique", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "elaidic-acid"}, update: {$set: {name: "Acide élaïdique", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "gondoic-acid"}, update: {$set: {name: "Acide gondoïque", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "mead-acid"}, update: {$set: {name: "Acide de Mead", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "erucic-acid"}, update: {$set: {name: "Acide érucique", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "nervonic-acid"}, update: {$set: {name: "Acide nervonique", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "trans-fat"}, update: {$set: {name: "Acide gras trans", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "cholesterol"}, update: {$set: {name: "cholestérol", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "fiber"}, update: {$set: {name: "fibres", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "sodium"}, update: {$set: {name: "Sodium", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "alcohol"}, update: {$set: {name: "Alcool %", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "vitamin-a"}, update: {$set: {name: "vitamine A", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "vitamin-d"}, update: {$set: {name: "vitamine D", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "vitamin-e"}, update: {$set: {name: "vitamine E", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "vitamin-k"}, update: {$set: {name: "vitamine K", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "vitamin-c"}, update: {$set: {name: "vitamine C", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "vitamin-b1"}, update: {$set: {name: "vitamine B1", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "vitamin-b2"}, update: {$set: {name: "vitamine B2", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "vitamin-pp"}, update: {$set: {name: "vitamine PP", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "vitamin-b6"}, update: {$set: {name: "vitamine B6", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "vitamin-b9"}, update: {$set: {name: "vitamine B9", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "vitamin-b12"}, update: {$set: {name: "vitamine B12", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "biotin"}, update: {$set: {name: "Biotine", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "pantothenic-acid"}, update: {$set: {name: "Acide pantothénique", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "silica"}, update: {$set: {name: "Silice", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "bicarbonate"}, update: {$set: {name: "Bicarbonate", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "potassium"}, update: {$set: {name: "Potassium", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "chloride"}, update: {$set: {name: "Chlore", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "calcium"}, update: {$set: {name: "Calcium", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "phosphorus"}, update: {$set: {name: "Phosphore", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "iron"}, update: {$set: {name: "Iron", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "magnesium"}, update: {$set: {name: "Magnésium", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "zinc"}, update: {$set: {name: "Zinc", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "copper"}, update: {$set: {name: "Cuivre", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "manganese"}, update: {$set: {name: "Manganèse", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "fluoride"}, update: {$set: {name: "Fluoride", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "selenium"}, update: {$set: {name: "Sélénium", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "chromium"}, update: {$set: {name: "Chrome", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "molybdenum"}, update: {$set: {name: "Molybdène", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "iodine"}, update: {$set: {name: "Iode", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "caffeine"}, update: {$set: {name: "caféine", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "taurine"}, update: {$set: {name: "Taurine", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "ph"}, update: {$set: {name: "PH", color: getRandomColor(), g: "Nomb", dateUpdate: new Date()}}, upsert: true}},
        {updateOne: {filter: {externId: "salt"}, update: {$set: {name: "Sel", color: getRandomColor(), g: "Mass", dateUpdate: new Date()}}, upsert: true}},

    ],
    {ordered: false}
)
