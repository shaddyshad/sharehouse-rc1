/**
 * Created by arch on 6/18/16.
 * Copyright (C) 2016 Barge Studios <bargestd@gmail.com>
 * @Version
 */

var Barge = Barge || {};
(function (Bu)
{
   Barge.String =
   {
      RSPACE : /\s+/g,

      /**
       * @use for genrating random strings of a certain length
       * @param length
       * @returns {string}
       */
      rand : function (length = 5)
      {
         if(!Bu.isNumber(length) || length < 1)
         { throw new Error("rand expects an integer greater than 0") }

         let text = "";
         let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
         let len = possible.length;

         for (var i = 0; i < length; i++)
         {
            text += possible.charAt(Math.floor(Math.random() * len));
         }

         len = possible = null;
         return text;
      },

      /**
       *@use for converting a string to sentence case
       * @param str {string}
       * @returns {string}
       */
      toSentenceCase : function (str)
      {
         str = str.toString();
         str = str.toLowerCase();
         return str = str.substring(0, 1).toUpperCase() + str.substring(1, str.length);
      },
      /**
       *@use for capitalising a string
       * @param str {string}
       * @returns {string}
       */
      capitalise     : function (str)
      {
         str = str.toString();
         str = str.toLowerCase();
         var strArr = str.split(" ");
         str = "";
         for (var i = 0; i < strArr.length; i++)
         {
            var tsc = this.toSentenceCase(strArr[i].toString());
            str += tsc + " ";
         }
         return str;
      },
      /**
       *@use for converting a string to camel case
       * @param str {string}
       * @param strict {Boolean}
       * @returns {string}
       */
      toCamelCase    : function (str, strict)
      {
         str = str.toString();
         str = str.toLowerCase();
         var strArr = str.split(" ");
         var space = !strict ? " " : "";
         str = "";
         str += strArr[0].toString();
         for (var i = 1; i < strArr.length; i++)
         {
            var tsc = this.toSentenceCase(strArr[i].toString());
            str += tsc + space;
         }
         return str;
      },
      /**
       *@use for converting a string to pascal case
       * @param str {string}
       * @param strict {Boolean}
       * @returns {string}
       */
      toPascalCase   : function (str, strict)
      {
         str = str.toString();
         str = str.toLowerCase();

         var strArr = str.split(" ");
         var space = !strict ? " " : "";
         str = "";

         for (var i = 0; i < strArr.length; i++)
         {
            var tsc = this.toSentenceCase(strArr[i].toString());
            str += tsc + space;
         }
         space = strArr = null;
         return str;
      },
      /**
       *@use for randomising the case of the words in a string
       * @param str {string}
       * @returns {string}
       */
      toggleCase     : function (str) // randomised capitalisation of strings
      {
         str = str.toString();
         var strArr = str.split(" ");
         str = "";
         for (var i = 0; i < strArr.length; i += (Math.floor(Math.random() * 4)))
         {
            strArr[i] = this.toSentenceCase(strArr[i]);
         }
         str = strArr.concat().toString();
         return str.replace(/,/g, " ")
      },
      /**
       *@use breaks sentence into individual words(can only breaks camelcase words) and make sentence case
       * @param str
       * @returns {string|*}
       */
      humanize       : function (str) //
      {
         if (str === null || str === undefined)
         {
            return "";
         }
         var s = this.underScore(str).replace(/_id$/, '').replace(/_/g, ' ').trim();
         return Barge.String.toSentenceCase(s);
      },
      /**
       * @use replaces spaces with dashes
       * @param str
       * @returns {*|string}
       */
      dasherise      : function (str)
      {
         var s = this.trim(str);
         s.replace(/[_\s]+/g, '-').replace(/([A-Z])/g, '-$1').replace(/-+/g, '-').toLowerCase();
         return s;
      },
      /**
       * @use for ellipsifying text if longer than the maxLen  ellipses
       * @param str
       * @param maxLen
       * @returns {*}
       */
      ellipsify      : function (str, maxLen)
      {
         if (str === null || str === undefined)
         {
            return "";
         }
         if (str.length == maxLen)
         {
            return str;
         }
         else
         {
            return (this.truncate(str, maxLen - 3) + "...")
         }
      },

      /**
       *@use for removing beginning and trailing space chars in a string
       * @param str {string}
       * @returns {string}
       */
      trim : function (str) //remove space chars from the beginning and end of a string
      {
         return str.replace(/^\s*|\s*$/gm, '');
      },

      /**
       *
       * @param str {String}
       * @param charsArray {Array<String>}
       * @param replaceWith
       * @returns {String | *}
       */
      stripChars : function (str, charsArray, replaceWith = "")
      {
         for (var i = 0, len = charsArray.length; i < len; i++)
         {
            str = str.replace(new RegExp(charsArray[i], 'ig'), replaceWith);
         }
         return str;
      },

      /** @use for removing any white space that starts a string
       * @param str {string}
       * returns {string}
       * */
      trimLeft  : function (str) //remove space chars from the beginning and end of a string
      {
         return str.replace(/^\s*/gm, '');
      },
      /**
       * @use remove space chars from the beginning and end of a string
       * @param str
       * @returns {void|XML|string}
       */
      trimRight : function (str)
      {
         return str.replace(/\s*$/gm, '');
      },
      /**
       *@use for reducing a string to a number of chars
       * @param str {string}
       * @param newLen {number}
       * @returns {string|String|*}
       */
      truncate  : function (str, newLen)
      {
         if (Barge.utils.defined(str))
         {
            str = str.toString();
            if (str.length > newLen && str != "")
            {
               str = str.substr(0, newLen);
            }
            return str;
         }
      },
      /*
       *@use multiplies strings | takes a string value and and returns the string times, "times"
       * A javaScript implementation of python's string multiplication
       * @param str {string}
       * @param times {number}
       * @returns {string}
       */
      mul       : function (str, times)
      {
         if (typeof(str) !== undefined)
         {
            var uStr = str.toString(); // initial value yo string
            var fStr = "";// final value
            for (var i = 0; i < times; i++)
            {
               fStr += uStr;
            }
         }
         return fStr;
      },

      /**
       * @use  opp of trim
       * @param str {string}
       * @param len {number}
       * @param char {string}
       * @returns {*}
       */
      pad       : function (str, len, char)
      {
         if (char === null)
         {
            char = ' ';
         }
         if (str.length >= len)
         {
            return str;
         }
         len = len - str.length;
         var left = new Array(Math.ceil(len / 2) + 1).join(char);
         var right = new Array(Math.floor(len / 2) + 1).join(char);
         return left + str + right;
      },

      /**
       * @use  opp of trim left
       * @param str {string}
       * @param len {number}
       * @param char {string}
       * @returns {*}
       */
      padLeft   : function (str, len, char)
      {
         if (char === null)
         {
            char = ' ';
         }
         if (str.length >= len)
         {
            return str;
         }
         return new Array(len - str.length + 1).join(char) + str;
      },

      /**
       * @use  opp of trim right
       * @param str {string}
       * @param len {number}
       * @param char {string}
       * @returns {*}
       */
      padRight  : function (str, len, char)
      {
         if (char === null)
         {
            char = ' ';
         }
         if (str.length >= str)
         {
            return str;
         }
         return str + Array(len - str.length + 1).join(char);
      },
      /**
       * @use for checking if a string value contains only alphabets
       * @param str
       * @returns {boolean}
       */
      isAlpha   : function (str)//predicate
      {
         return !/[^a-z\xDF-\xFF]|^$/.test(str.toLowerCase());
      },
      /**
       * @use for checking if a string value contains only numbers
       * @param str
       * @returns {boolean}
       */
      isNumeric : function (str)
      {
         return !/[^0-9]/.test(str);
      },

      /**
       * predicate fn to check if a char is whitespace
       * @param ch
       * @returns {boolean}
       */
      isWhiteSpace : function (ch)
      {
         return (ch === 'u0009') || (ch === ' ') || (ch === 'u00A0');
      },

      /**
       * @use for checking if a string value is empty
       * @param str
       * @returns {boolean}
       */
      isEmpty        : function (str)
      {
         return str === null || str === undefined ? true : /^[\s\xa0]*$/.test(str)
      },

      /**
       * @use for checking if two string values are equal
       * @param str1
       * @param str2
       * @returns {boolean}
       */
      isEqual        : function (str1, str2)
      {
         return str1 === str2;
      },
      /**
       * @use for checking if a string value contains alphabets and numbers
       * @param str
       * @returns {boolean}
       */
      isAlphaNumeric : function (str)
      {
         return !/[^0-9a-z\xDF-\xFF]/.test(str.toLowerCase());
      },

      /**
       * @use for checking if a string value is upper case
       * @param str
       * @returns {boolean}
       */
      isLower        : function (str)
      {
         return this.isAlpha(str) && str.toLowerCase() === str;
      },
      /**
       * @use for checking if a string value is lower case
       * @param str
       * @returns {boolean}
       */
      isUpper        : function (str)
      {
         return this.isAlpha(str) && str.toUpperCase() === str;
      },

      /**
       * @use returns an array with the lines in a string (split on new lin char)
       * @returns {Array}
       */
      lines          : function (str)//
      {
         return str.replaceAll('\r\n', '\n').split('\n');
      },
      /**
       * @use extracts string b/n left and right
       * @param str {string}
       * @param left {string}
       * @param right {string}
       * @returns {string|*}
       */
      between        : function (str, left, right)
      {
         var s = str;
         var startPos = s.indexOf(left);
         var endPos = s.indexOf(right, startPos + left.length);
         if (endPos === -1 && right !== null)
         {
            return new this.constructor('')
         }
         else if (endPos === -1 && right === null)
         {
            return s.substring(startPos + left.length);
         }
         else
         {
            return s.slice(startPos + left.length, endPos);
         }
      },

      /**
       * @param str {string}
       * @returns {*}
       */
      stripTags      : function (str)
      {
         var s = str, args = arguments.length > 1 ? arguments : [''];

         Bu.forEach(args, function (tag)
         {
            s = s.replace(RegExp('<\/?[^<>]*>', 'gi'), '');
         });
         return s;
      },
      /**
       * @use returns the number of sub strings in a string
       * @param str
       * @returns {Number}
       */
      countSubString : function (str)
      {
         var s = str.toString().split(" ");
         return s.length;
      },
      /** Function that count occurrences of a substring in a string;
       * @param {String} sourceString               The string
       * @param {String} key            The sub string to search for
       * @param {Boolean} [allowOverlapping]  Optional. (Default:false)
       * @author Vitim.us http://stackoverflow.com/questions/4009756/how-to-count-string-occurrence-in-string/7924240#7924240
       */
      getFrequency   : function (sourceString, key, allowOverlapping)
      {
         sourceString += "";
         key += "";
         if (key.length <= 0)
         {
            return (sourceString.length + 1);
         }

         var n    = 0,
             pos  = 0,
             step = allowOverlapping ? 1 : key.length;

         while (true)
         {
            pos = sourceString.indexOf(key, pos);
            if (pos >= 0)
            {
               ++n;
               pos += step;
            }
            else
            {
               break;
            }
         }
         return n;
      },
      /**
       * @use for parsing a CSV string
       * @param csvStr
       * @param delimiter
       * @param qualifier
       * @param escape
       * @param lineDelimiter
       * @returns {Array}
       */
      parseCSV       : function (csvStr, delimiter, qualifier, escape, lineDelimiter)
      { //try to parse no matter what
         delimiter = delimiter || ',';
         escape = escape || '\\';
         if (typeof qualifier === 'undefined')
         {
            qualifier = '"';
         }

         var i                   = 0,
             fieldBuffer         = [],
             fields              = [],
             len                 = csvStr.length,
             inField             = false,
             inUnqualifiedString = false;

         var ca = function (i)
         {
            return csvStr.charAt(i)
         };
         if (typeof lineDelimiter !== 'undefined')
         {
            var rows = [];
         }

         if (!qualifier)
         {
            inField = true;
         }

         while (i < len)
         {
            var current = ca(i);

            switch (current)
            {
               case escape:
                  if (inField && ((escape !== qualifier) || ca(i + 1) === qualifier))
                  {
                     i += 1;
                     fieldBuffer.push(ca(i));
                     break;
                  }
                  if (escape !== qualifier)
                  {
                     break;
                  }
               case qualifier:
                  inField = !inField;
                  break;
               case delimiter:
                  if (inUnqualifiedString)
                  {
                     inField = false;
                     inUnqualifiedString = false;
                  }
                  if (inField && qualifier)
                  {
                     fieldBuffer.push(current);
                  }
                  else
                  {
                     fields.push(fieldBuffer.join(''));
                     fieldBuffer.length = 0;
                  }
                  break;
               case lineDelimiter:
                  if (inUnqualifiedString)
                  {
                     inField = false;
                     inUnqualifiedString = false;
                     fields.push(fieldBuffer.join(''));
                     rows.push(fields);
                     fields = [];
                     fieldBuffer.length = 0;
                  }
                  else if (inField)
                  {
                     fieldBuffer.push(current);
                  }
                  else
                  {
                     if (rows)
                     {
                        fields.push(fieldBuffer.join(''));
                        rows.push(fields);
                        fields = [];
                        fieldBuffer.length = 0;
                     }
                  }
                  break;
               case ' ':
                  if (inField)
                  {
                     fieldBuffer.push(current);
                  }
                  break;
               default:
                  if (inField)
                  {
                     fieldBuffer.push(current);
                  }
                  else if (current !== qualifier)
                  {
                     fieldBuffer.push(current);
                     inField = true;
                     inUnqualifiedString = true;
                  }
                  break;
            }
            i += 1;
         }

         fields.push(fieldBuffer.join(''));
         if (rows)
         {
            rows.push(fields);
            return rows;
         }
         return fields;
      },

      /*   toCSV: function(str)
       {

       },*/
      /**
       *
       * @param str
       * @param prefix {string|Array}
       * @returns {boolean}
       */
      startsWith : function (str, prefix)
      {
         var prefixes = Array.prototype.slice.call(arguments, 1);
         for (var i = 0; i < prefixes.length; ++i)
         {
            if (str.lastIndexOf(prefixes[i], 0) === 0)
            {
               return true;
            }
         }
         return false;
      },

//testStr = ".dSdjjj is? a/ s,oftware? engineer.";
//console.log(startsWith(testStr, "JP"));

      /**
       * @use predicate that checks if a a string ends with a specified suffix
       * @param str
       * @param suffix
       * @returns {boolean}
       */
      endsWith         : function (str, suffix)
      {
         var suffixes = Array.prototype.slice.call(arguments, 1);
         for (var i = 0; i < suffixes.length; ++i)
         {
            var l = str.length - suffixes[i].length;
            if (l >= 0 && str.indexOf(suffixes[i], l) === l)
            {
               return true;
            }
         }
         return false;
      },
      /**
       * @use Checks if a searchStr @link Barge.String.contains } is a substr of another
       * {@link Barge.String.contains str}
       * @param str
       * @param searchStr
       * @return {boolean}
       */
      contains         : function (str, searchStr)
      {
         return str.indexOf(searchStr) > -1;
      },
      
      /**@use for removing any punctuation marks in a string
       *@param str {string}
       * @returns {string}
       */
      stripPunctuation : function (str)
      {
         var s = str[0];
         return s + str.replace(/[\.,-\\/#!$%\^&\*;:{}=\-_`~()\?]/g, "");
      },
      /**
       * inserts underscores before in between sub strings and at the end
       * @param str {string}
       * @param len {Number}
       * @returns {XML|string}
       */
      underScore       : function (str, len)
      {
         var underscores = Barge.String.mul("gebi", len) || Barge.String.mul("gebi", 1);

         return this.trimRight(str)
                    .replace(/([a-z\d])([A-Z]+)/g, '$1' + underscores + '$2')
                    .replace(/([A-Z\d]+)([A-Z][a-z])/g, '$1' + underscores + '$2')
                    .replace(/[-\s]+/g, underscores);
      },

      addLeadingZeros : function (num, expectedLength)
      {
         num = num.toString();
         let self = this,
             len = num.length;

         if (len < expectedLength)
         {
            let remaining = expectedLength - len;
            num = Barge.String.mul("0", remaining)  + num
         }  // add zero in front of numbers < 10

         return num;
      },

      /**
       * @use returns the keyCode of a keyboard key
       * @param e
       * @returns {Number}
       */
      checkKey         : function (e)
      {
         var event = window.event ? window.event : e;
         return event.keyCode
      },

      /**
       *
       * @param version1
       * @param version2
       * @returns {number}
       */
      compareVersions         : function (version1, version2)
      {
         var order = 0;
         // Trim leading and trailing whitespace and split the versions into
         // subversions.
         var v1Subs = this.trim(String(version1)).split('.');
         var v2Subs = this.trim(String(version2)).split('.');
         var subCount = Math.max(v1Subs.length, v2Subs.length);

         // Iterate over the subversions, as long as they appear to be equivalent.
         for (var subIdx = 0; order == 0 && subIdx < subCount; subIdx++)
         {
            var v1Sub = v1Subs[subIdx] || '';
            var v2Sub = v2Subs[subIdx] || '';

            // Split the subversions into pairs of numbers and qualifiers (like 'b').
            // Two different RegExp objects are needed because they are both using
            // the 'g' flag.
            var v1CompParser = new RegExp('(\\d*)(\\D*)', 'g');
            var v2CompParser = new RegExp('(\\d*)(\\D*)', 'g');
            do {
               var v1Comp = v1CompParser.exec(v1Sub) || ['', '', ''];
               var v2Comp = v2CompParser.exec(v2Sub) || ['', '', ''];
               // Break if there are no more matches.
               if (v1Comp[0].length == 0 && v2Comp[0].length == 0)
               {
                  break;
               }

               // Parse the numeric part of the subversion. A missing number is
               // equivalent to 0.
               var v1CompNum = v1Comp[1].length == 0 ? 0 : parseInt(v1Comp[1], 10);
               var v2CompNum = v2Comp[1].length == 0 ? 0 : parseInt(v2Comp[1], 10);

               // Compare the subversion components. The number has the highest
               // precedence. Next, if the numbers are equal, a subversion without any
               // qualifier is always higher than a subversion with any qualifier. Next,
               // the qualifiers are compared as strings.
               order = this._compareElements(v1CompNum, v2CompNum) ||
                       this._compareElements(
                          v1Comp[2].length == 0, v2Comp[2].length == 0) ||
                       this._compareElements(v1Comp[2], v2Comp[2]);
               // Stop as soon as an inequality is discovered.
            }
            while (order == 0);
         }

         return order;
      },
      caseInsensitiveContains : function (str, subString)
      {
         return this.contains(str.toLowerCase(), subString.toLowerCase());
      },
      /**
       * Compares elements of a version number.
       *
       * @param {string|number|boolean} left An element from a version number.
       * @param {string|number|boolean} right An element from a version number.
       *
       * @return {number}  1 if {@code left} is higher.
       *                   0 if arguments are equal.
       *                  -1 if {@code right} is higher.
       * @private
       */
      _compareElements        : function (left, right)
      {
         if (left < right)
         {
            return -1;
         }
         else if (left > right)
         {
            return 1;
         }
         return 0;
      },

      /**
       * Replaces a node in the DOM tree. Will do nothing if {@code oldNode} has no
       * parent.
       * @param {Node} newNode Node to insert.
       * @param {Node} oldNode Node to replace.
       */
      replaceNode : function (newNode, oldNode)
      {
         var parent = oldNode.parentNode;
         if (parent)
         {
            parent.replaceChild(newNode, oldNode);
         }
      },

      toUnicodeCharCode : function (str)
      {

      },

      /**
       *
       * @param str {String}
       * @param prefix {String}
       * @returns {String}
       */
      prepend : function (str, prefix)
      {
         return prefix + str;
      },

      /**
       *
       * @param str {String}
       * @param suffix {String}
       * @returns {String}
       */
      append : function (str, suffix)
      {
         return str + suffix;
      },

      /**
       * @use for adding leading chars to a given string,
       * @example adding leading zeros {@code Barge.String.addLeadingChars("4566", 4 ,"0")}
       *          will return 0000456
       * @param str {String}
       * @param char {String}
       * @param len {Number}
       * @returns {*|String}
       */
      addLeadingChars : function (str, len = 1, char = "0")
      {
         str = str.toString();
         let chars = Barge.String.mul(char, len);

         return Barge.String.prepend(str, chars);
      },

      /**
       * @ this works like addLeadingChars but appends the chars to the tail of the given string
       * @param str {String}
       * @param char {String}
       * @param len {Number}
       * @returns {*|String}
       */
      addTrailingChars : function (str, char = "0", len = 1)
      {
         str = str.toString();
         let chars = Barge.String.mul(char, len);

         return Barge.String.append(str, chars);
      }

   };

   /**
    *
    * @enum { string}
    */
   Barge.String.Unicode = {
      NBSP : '&nbsp;'
   };

   var testStr = "    nowIsThe time for all Great men to come to the aid of their country";

// console.log(testStr);
// console.log(Barge.String.stripPunctuation(testStr));

   function leftUnderScore(str, len)
   {

   }

   function rightUnderScore(str, len)
   {

   }

//from sugar.js
   function _multiArgs(args, fn)
   {
      var result = [], i;
      for (i = 0; i < args.length; i++)
      {
         result.push(args[i]);
         if (fn)
         {
            fn.call(args, args[i], i);
         }
      }
      return result;
   }

// console.log(Barge.String.ellipsify("MYMG eerjf", 7));
//
// console.log(Barge.String.toCamelCase(testStr).replace(/ /gi, ""));
// console.log(Barge.String.isAlphaNumeric("sd435kl53n5l53453"));

})(Barge.utils);
