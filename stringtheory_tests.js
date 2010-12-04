// Test suite for StringTheory for JS v0.01. Yay.

function testResult(condition)
{
	if(condition) return "<span class='pass'>PASSED</span>";
	
	return "<span class='fail'>FAILED</span>";
}

function showTest(testName, test)
{
	document.write(testResult(test) + "&nbsp;&nbsp;&nbsp;" + testName + "<br/>");
}


var str = new ST("Mares eat oats and does eat oats but little lambs eat ivy.");

try
{

showTest("Initialization test 1", str.length = 58);

showTest("Copy Test 1", (str.copy(0, 3) == "Mar") );
showTest("Copy Test 2", (str.copy(55, 3) == "vy.") );
showTest("Copy Test 3", (str.copy(55, 10) == "vy.") ); // Over-runs should be handled too.
showTest("Copy Test 4", (str.copy(58, 3) == "Mar") ); // Out-of-bounds indices should be modulated.
showTest("Copy Test 5", (str.copy(0, 0) == "") ); // Don't freak out if asked for nothing.

showTest("Copy Test 6", (str.copy() == "Mares eat oats and does eat oats but little lambs eat ivy.") ); // Copy the entire string if no params.


showTest("Cut Test 1", (str.cut(0, 3) == "Mar") );
showTest("Cut Test 2", (str == "es eat oats and does eat oats but little lambs eat ivy.") );

str = new ST("Mares eat oats and does eat oats but little lambs eat ivy.");
showTest("Cut Test 3", (str.cut(55, 3) == "vy.") );
showTest("Cut Test 4", (str == "Mares eat oats and does eat oats but little lambs eat i") );

result = "Mares eat oats and does eat oats but little lambs eat ivy.";

str = new ST("eat oats and does eat oats but little lambs eat ivy.");
str.paste(0, "Mares ");
showTest("Paste Test 1", str.text == result);

str = new ST("Mares eat oats and does eat oats but little lambs eat ivy.");
str.paste(0, "");
showTest("Paste Test 2", str.text == result);

str = new ST("Mares eat oats and does eat oats but little lambs eat ivy.");
str.paste(str.text.length - 1, "");
showTest("Paste Test 3", str.text == result);

str = new ST("Mares eat oats");
str.append(" and does eat oats but little lambs eat ivy.");

showTest("Append Test 1", str.text == result);


str = new ST(" and does eat oats but little lambs eat ivy.");
str.prepend("Mares eat oats");

showTest("Prepend Test 1", str.text == result);


str = new ST("Mares eat oats");
str.quote();

showTest("Quote Test 1", str.text == "\"Mares eat oats\"");

str = new ST("Mares eat oats");
str.quote('xXx');

showTest("Quote Test 2", str.text == "xXxMares eat oatsxXx");

str = new ST("Mares eat oats");
showTest("Word Count Test 1", str.words().length == 3 );

str = new ST("");
showTest("Word Count Test 2", str.words().length == 0 );

str = new ST("This\tis\ta\tzither");
showTest("Word Count Test 3", str.words().length == 4 );


str = new ST("Mares eat oats");
str.ellipsize(12);
showTest("Ellipsize Test 1", str == "Mares eat...");

str = new ST("Mares eat %GRAIN% and does eat %GRAIN% but little lambs eat %PLANT%.");

var translate = {};

translate["GRAIN"] = "oats";
translate["PLANT"] = "ivy";

str.populate(translate);
showTest("Populate Test 1", str == "Mares eat oats and does eat oats but little lambs eat ivy.");


document.write(str);

}
catch(ex)
{
	showTest("<div class='exception'>SCRIPT ERROR. " + ex + "</div>", false);
	document.write();
}









