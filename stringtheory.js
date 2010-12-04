// StringTheory - A text processing library for Javascript
//----------------------------------------------------------------------------
// Created by Matt Youell (matt@youell.com) (c) 2003-2010
// http://youell.com/matt
//
// StringTheory(tm) is a trademark of Built Software Corp.
//
// This software is released under Creative Commons Attribution 3.0 license.
// http://creativecommons.org/licenses/by/3.0/us/
//----------------------------------------------------------------------------

//----------------------------------------------------------------------------
// Usage
//----------------------------------------------------------------------------
/*
var str = ST("put text in here");

str.paste(4, "your ");

// The raw String is always available as .text, although the implicit toString
// method will return the same value. 

*/


//----------------------------------------------------------------------------
// ST Methods
//----------------------------------------------------------------------------
function ST(str)
{
	this.text = str;
	this.toString = function() { return this.text ? this.text : ""; }
}

ST.prototype.length = function() { return this.text.length; }

ST.prototype.copy = function (start, length) 
{ 
	// Copy the whole string if no parameters are given.
	if( arguments.length != 2 ) return this.text.substr(0, this.text.length);

	return this.text.substr(this.bounds(start), length); 
}

ST.prototype.bounds = function(index) { return index % this.text.length; }

// Returns the last valid index in the string.
ST.prototype.end = function() { return Math.max(this.text.length - 1, 0); }

ST.prototype.cut = function (start, length)
{
	var clip = this.text.substr(start, length);

	var head = this.copy(0, start);

	var tail = "";

	if(start + length < this.text.length) // We need this because of the "friendly" way copy() handles indexes.
	{
		tail = this.copy(start + length, this.end() - start + length);
	}
	
	this.text = head + tail;
	
	return clip;
	
}

ST.prototype.paste = function (position, text) // Paste inserts text, it does not overwrite text.
{
	// Two argument scenario: no replacement, just insertion.
	return this.text = this.copy(0, position) + text + this.copy(position, this.end() - position + 1);
}

ST.prototype.append = function (text) { return this.paste(this.end() + 1, text); }

ST.prototype.prepend = function (text) { return this.paste(0, text); }



//----------------------------------------------------------------------------
// Additional Methods
//----------------------------------------------------------------------------

ST.prototype.quote = function(val) // val could be a char, a string, an object, or nothing.
{
	if(!val) val = '"'; // Default to standard double quote
	
	return this.text = val + this.text + val;  // Slightly bugs me that this is a stateful change instead of a filtering action.
}

ST.prototype.words = function(){ return this.text ? this.text.split(/\W+/) : []; }


ST.prototype.contract = function(size)
{ 
	if(this.text.length <= size) return this.text;

	return this.text = this.copy(0, size);
}


// If the string exceeds 'size', reduce so that string plus ellipsis are <= 'size'.
ST.prototype.ellipsize = function(size)
{ 
	if(this.text.length <= size) return this.text;
	
	this.contract(size -  3);
	
	this.append("...");
	
	return this;
}

// Populate a template with a dictionary of values.
ST.prototype.populate = function(dictionary)
{ 
	if(dictionary.length < 1) return this.text; // Not much point.
	
	for(entry in dictionary)
	{
		this.text = this.text.replace(new RegExp('%' + entry + '%', "g"), dictionary[entry]);
	}
	
	return this.text;
}


