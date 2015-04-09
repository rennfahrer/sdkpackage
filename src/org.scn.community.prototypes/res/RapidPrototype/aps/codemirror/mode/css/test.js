(function() {
  var mode = CodeMirror.getMode({tabSize: 1}, "css");
  function MT(name) { test.mode(name, mode, Array.prototype.slice.call(arguments, 1)); }
  function IT(name) { test.indentation(name, mode, Array.prototype.slice.call(arguments, 1)); }

  // Requires at least one media query
  MT("atMediaEmpty",
     "[def @media] [error {] }");

  MT("atMediaMultiple",
     "[def @media] [keyword not] [attribute screen] [operator and] ([property color]), [keyword not] [attribute print] [operator and] ([property color]) { }");

  MT("atMediaCheckStack",
     "[def @media] [attribute screen] { } [tag foo] { }");

  MT("atMediaCheckStack",
     "[def @media] [attribute screen] ([property color]) { } [tag foo] { }");

  MT("atMediaPropertyOnly",
     "[def @media] ([property color]) { } [tag foo] { }");

  MT("atMediaCheckStackInvalidAttribute",
     "[def @media] [attribute&error foobarhello] { [tag foo] { } }");

  MT("atMediaCheckStackInvalidAttribute",
     "[def @media] [attribute&error foobarhello] { } [tag foo] { }");

  // Error, because "and" is only allowed immediately preceding a media expression
  MT("atMediaInvalidAttribute",
     "[def @media] [attribute&error foobarhello] { }");

  // Error, because "and" is only allowed immediately preceding a media expression
  MT("atMediaInvalidAnd",
     "[def @media] [error and] [attribute screen] { }");

  // Error, because "not" is only allowed as the first item in each media query
  MT("atMediaInvalidNot",
     "[def @media] [attribute screen] [error not] ([error not]) { }");

  // Error, because "only" is only allowed as the first item in each media query
  MT("atMediaInvalidOnly",
     "[def @media] [attribute screen] [error only] ([error only]) { }");

  // Error, because "foobarhello" is neither a known type or property, but
  // property was expected (after "and"), and it should be in parenthese.
  MT("atMediaUnknownType",
     "[def @media] [attribute screen] [operator and] [error foobarhello] { }");

  // Error, because "color" is not a known type, but is a known property, and
  // should be in parentheses.
  MT("atMediaInvalidType",
     "[def @media] [attribute screen] [operator and] [error color] { }");

  // Error, because "print" is not a known property, but is a known type,
  // and should not be in parenthese.
  MT("atMediaInvalidProperty",
     "[def @media] [attribute screen] [operator and] ([error print]) { }");

  // Soft error, because "foobarhello" is not a known property or type.
  MT("atMediaUnknownProperty",
     "[def @media] [attribute screen] [operator and] ([property&error foobarhello]) { }");

  // Make sure nesting works with media queries
  MT("atMediaMaxWidthNested",
     "[def @media] [attribute screen] [operator and] ([property max-width][operator :] [number 25px]) { [tag foo] { } }");

  MT("tagSelector",
     "[tag foo] { }");

  MT("classSelector",
     "[qualifier .foo-bar_hello] { }");

  MT("idSelector",
     "[builtin #foo] { [error #foo] }");

  MT("tagSelectorUnclosed",
     "[tag foo] { [property margin][operator :] [number 0] } [tag bar] { }");

  MT("tagStringNoQuotes",
     "[tag foo] { [property font-family][operator :] [variable-2 hello] [variable-2 world]; }");

  MT("tagStringDouble",
     "[tag foo] { [property font-family][operator :] [string \"hello world\"]; }");

  MT("tagStringSingle",
     "[tag foo] { [property font-family][operator :] [string 'hello world']; }");

  MT("tagColorKeyword",
     "[tag foo] {" +
       "[property color][operator :] [keyword black];" +
       "[property color][operator :] [keyword navy];" +
       "[property color][operator :] [keyword yellow];" +
       "}");

  MT("tagColorHex3",
     "[tag foo] { [property background][operator :] [atom #fff]; }");

  MT("tagColorHex6",
     "[tag foo] { [property background][operator :] [atom #ffffff]; }");

  MT("tagColorHex4",
     "[tag foo] { [property background][operator :] [atom&error #ffff]; }");

  MT("tagColorHexInvalid",
     "[tag foo] { [property background][operator :] [atom&error #ffg]; }");

  MT("tagNegativeNumber",
     "[tag foo] { [property margin][operator :] [number -5px]; }");

  MT("tagPositiveNumber",
     "[tag foo] { [property padding][operator :] [number 5px]; }");

  MT("tagVendor",
     "[tag foo] { [meta -foo-][property box-sizing][operator :] [meta -foo-][string-2 border-box]; }");

  MT("tagBogusProperty",
     "[tag foo] { [property&error barhelloworld][operator :] [number 0]; }");

  MT("tagTwoProperties",
     "[tag foo] { [property margin][operator :] [number 0]; [property padding][operator :] [number 0]; }");

  MT("tagTwoPropertiesURL",
     "[tag foo] { [property background][operator :] [string-2 url]([string //example.com/foo.png]); [property padding][operator :] [number 0]; }");

  MT("commentSGML",
     "[comment <!--comment-->]");

  IT("tagSelector",
    "strong, em [1 { background][2 : rgba][3 (255, 255, 0, .2][2 )][1 ;]}");

  IT("atMedia",
    "[1 @media { foo ][2 { ][1 } ]}");

  IT("comma",
    "foo [1 { font-family][2 : verdana, sans-serif][1 ; ]}");

  IT("parentheses",
    "foo [1 { background][2 : url][3 (\"bar\"][2 )][1 ; ]}");

  IT("pseudo",
    "foo:before [1 { ]}");
})();
