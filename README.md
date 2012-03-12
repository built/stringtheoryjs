StringTheory for Javascript
------------------------------
About 10 years ago I created a "text engine" for Java that I named StringTheory(tm).

I've lost the original Java code but I have a port to C#. I've always wanted a JS implementation though. This is a start on that.

### What's it do?
StringTheory (ST) is basically a string library that revolves around a buffer that is changed in-place. 
ST is designed with a simple core that uses a Cut-Copy-Paste metaphor. Other operations in the library build on that core.

### Example
Here's an example from the test suite:

    str = new ST("eat oats and does eat oats but little lambs eat ivy.");
    str.paste(0, "Mares "); // str => "Mares eat oats and does eat oats but little lambs eat ivy.");
    console.log(str.text);

### License
This material is available under the MIT license. See license.txt in this repo.
