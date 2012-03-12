// Test suite for StringTheory for JS v0.01.
// Now using QUnit.
$(document).ready(function(){

    var str = new ST("Mares eat oats and does eat oats but little lambs eat ivy.");

    module("StringTheory Core");

    test("Initialization test 1", function() {
      equal( str.length(), 58, "Length should be 58." );
    });

    test("Copy tests", function() {
        equal(str.copy(0, 3), "Mar");
        equal(str.copy(55, 3), "vy.");
        equal(str.copy(55, 10), "vy."); // Over-runs should be handled too.
        equal(str.copy(58, 3), "Mar"); // Out-of-bounds indices should be modulated.
        equal(str.copy(0, 0), ""); // Don't freak out if asked for nothing.
        equal(str.copy(), "Mares eat oats and does eat oats but little lambs eat ivy."); // Copy the entire string if no params.
    });

    test("Cut tests", function() {
        equal(str.cut(0, 3), "Mar");
        equal(str, "es eat oats and does eat oats but little lambs eat ivy.");

        str = new ST("Mares eat oats and does eat oats but little lambs eat ivy.");

        equal(str.cut(55, 3), "vy.");
        equal(str, "Mares eat oats and does eat oats but little lambs eat i");
    });

    result = "Mares eat oats and does eat oats but little lambs eat ivy.";

    test("Paste tests", function() {
        str = new ST("eat oats and does eat oats but little lambs eat ivy.");
        str.paste(0, "Mares ");
        equal(str.text, result);

        str = new ST("Mares eat oats and does eat oats but little lambs eat ivy.");
        str.paste(0, "");
        equal(str.text, result);

        str = new ST("Mares eat oats and does eat oats but little lambs eat ivy.");
        str.paste(str.text.length - 1, "");
        equal(str.text, result);
    });

    test("Append/Prepend", function() {
        str = new ST("Mares eat oats");
        str.append(" and does eat oats but little lambs eat ivy.");

        equal(str.text, result);

        str = new ST(" and does eat oats but little lambs eat ivy.");
        str.prepend("Mares eat oats");

        equal(str.text, result);
    });


    test("Quote tests", function() {
    str = new ST("Mares eat oats");
    str.quote();

    equal(str.text, "\"Mares eat oats\"");

    str = new ST("Mares eat oats");
    str.quote('xXx');

    equal(str.text, "xXxMares eat oatsxXx");
    });

    test("Word tests", function() {
    str = new ST("Mares eat oats");
    equal(str.words().length, 3);

    str = new ST("");
    equal(str.words().length, 0);

    str = new ST("This\tis\ta\tzither");
    equal(str.words().length, 4);
    });

    test("Ellipsize tests", function() {
    str = new ST("Mares eat oats");
    str.ellipsize(12);
    equal(str, "Mares eat...");
    });

    test("Populate tests", function() {
    str = new ST("Mares eat %GRAIN% and does eat %GRAIN% but little lambs eat %PLANT%.");

    var translate = {};

    translate["GRAIN"] = "oats";
    translate["PLANT"] = "ivy";

    str.populate(translate);
    equal(str, "Mares eat oats and does eat oats but little lambs eat ivy.");
    });

});

