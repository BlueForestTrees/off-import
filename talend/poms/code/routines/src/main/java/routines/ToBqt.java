package routines;

import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class ToBqt {

	private static Pattern pattern = Pattern.compile("^ *(\\d+) *([a-zA-Z]+)( +e? *)?$");
    private static Matcher matcher;
    private static Map<String, Double> coefs = new HashMap<String, Double>();
    private static Map<String, String> gs = new HashMap<String, String>();

    static{
    	gs.put("mg", "Mass");
    	gs.put("g", "Mass");
    	gs.put("G", "Mass");
    	gs.put("gr", "Mass");
    	gs.put("gramme", "Mass");
    	gs.put("grammes", "Mass");
    	gs.put("grammi", "Mass");
    	gs.put("grames", "Mass");
    	gs.put("gram", "Mass");
    	gs.put("grams", "Mass");
    	gs.put("grs", "Mass");
    	gs.put("kg", "Mass");
    	gs.put("kilo", "Mass");
    	gs.put("Kg", "Mass");
    	gs.put("KG", "Mass");
    	gs.put("oz", "Mass");
    	gs.put("Oz", "Mass");
    	gs.put("OZ", "Mass");
    	
    	gs.put("L", "Volu");
    	gs.put("l", "Volu");
    	gs.put("litre", "Volu");
    	gs.put("liter", "Volu");
    	gs.put("Liter", "Volu");
    	gs.put("Liters", "Volu");
    	gs.put("littes", "Volu");
    	gs.put("litres", "Volu");
    	gs.put("Litres", "Volu");
    	gs.put("Litre", "Volu");
    	gs.put("litro", "Volu");
    	gs.put("dl","Volu");
    	gs.put("cl","Volu");
    	gs.put("CL","Volu");
    	gs.put("Cl","Volu");
    	gs.put("cL","Volu");
    	gs.put("ml","Volu");
    	gs.put("mL","Volu");
    	gs.put("ML","Volu");
    	
    	coefs.put("mg", 0.000001);
    	coefs.put("g", 0.001);
    	coefs.put("G", 0.001);
    	coefs.put("gr", 0.001);
    	coefs.put("gramme", 0.001);
    	coefs.put("grammes", 0.001);
    	coefs.put("grammi", 0.001);
    	coefs.put("grames", 0.001);
    	coefs.put("gram", 0.001);
    	coefs.put("grams", 0.001);
    	coefs.put("grs", 0.001);
    	coefs.put("kg", 1d);
    	coefs.put("kilo", 1d);
    	coefs.put("Kg", 1d);
    	coefs.put("KG", 1d);
    	coefs.put("oz", 0.028349523125);
    	coefs.put("Oz", 0.028349523125);
    	coefs.put("OZ", 0.028349523125);
    	
    	coefs.put("L", 0.001);
    	coefs.put("l", 0.001);
    	coefs.put("litre", 0.001);
    	coefs.put("liter", 0.001);
    	coefs.put("Liter", 0.001);
    	coefs.put("Liters", 0.001);
    	coefs.put("littes", 0.001);
    	coefs.put("litres", 0.001);
    	coefs.put("Litres", 0.001);
    	coefs.put("Litre", 0.001);
    	coefs.put("litro", 0.001);
    	coefs.put("dl",0.0001);
    	coefs.put("cl",0.00001);
    	coefs.put("CL",0.00001);
    	coefs.put("Cl",0.00001);
    	coefs.put("cL",0.00001);
    	coefs.put("ml",0.000001);
    	coefs.put("mL",0.000001);
    	coefs.put("ML",0.000001);
    }
    
    /**
     * 
     * {talendTypes} String
     * 
     * {Category} User Defined
     * 
     * {param} string("120g") input: The string need to be parsed.
     * 
     */    
    public static Object toBqt(final String rawQt) {
    	Map<String, Object> quantity = null;
    	
    	matcher = pattern.matcher(rawQt);
    	if(matcher.matches()){
    		final Double qt = Double.parseDouble(matcher.group(1));
    		final String unit = matcher.group(2);
    		final Double coef = coefs.get(unit);
    		if(coef != null){
    			quantity = new HashMap<String, Object>(); 
    			quantity.put("bqt", qt * coef);
    			quantity.put("g", gs.get(unit));
    		}
    	}
    	
    	return quantity;
    }
}
