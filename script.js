// Regular expression to check for valid variable name
var regex = def_regex = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/;   // for c,cpp,java,js
var python_regex =      /^[a-zA-Z_][a-zA-Z0-9_]*$/;     // $ not allowed in py

// parameters for validity
// reserved words
const cKeywords = [
    "alignas", "alignof", "auto", "bool", "break", "case", "char", "const", 
    "constexpr", "continue", "default", "do", "double", "else", "enum", 
    "extern", "false", "float", "for", "goto", "if", "inline", "int", "long", 
    "nullptr", "register", "restrict", "return", "short", "signed", "sizeof", 
    "static", "static_assert", "struct", "switch", "thread_local", "true", 
    "typedef", "typeof", "typeof_unqual", "union", "unsigned", "void", 
    "volatile", "while", "_Alignas", "_Alignof", "_Atomic", "_BitInt", "_Bool", 
    "_Complex", "_Decimal128", "_Decimal32", "_Decimal64", "_Generic", 
    "_Imaginary", "_Noreturn", "_Static_assert", "_Thread_local"
];
const cppKeywords = [
    "alignas", "alignof", "and", "and_eq", "asm", "atomic_cancel", 
    "atomic_commit", "atomic_noexcept", "auto", "bitand", "bitor", 
    "bool", "break", "case", "catch", "char", "char8_t", "char16_t", 
    "char32_t", "class", "compl", "concept", "const", "consteval", 
    "constexpr", "constinit", "const_cast", "continue", "co_await", 
    "co_return", "co_yield", "decltype", "default", "delete", "do", 
    "double", "dynamic_cast", "else", "enum", "explicit", "export", 
    "extern", "false", "float", "for", "friend", "goto", "if", 
    "inline", "int", "long", "mutable", "namespace", "new", 
    "noexcept", "not", "not_eq", "nullptr", "operator", "or", 
    "or_eq", "private", "protected", "public", "reflexpr", 
    "register", "reinterpret_cast", "requires", "return", 
    "short", "signed", "sizeof", "static", "static_assert", 
    "static_cast", "struct", "switch", "synchronized", 
    "template", "this", "thread_local", "throw", "true", 
    "try", "typedef", "typeid", "typename", "union", 
    "unsigned", "using", "virtual", "void", "volatile", 
    "wchar_t", "while", "xor", "xor_eq"
];			
const javaKeywords = [
    "abstract", "continue", "for", "new", "switch", "assert", "default", "goto", "package", "synchronized",
    "boolean", "do", "if", "private", "this", "break", "double", "implements", "protected", "throw",
    "byte", "else", "import", "public", "throws", "case", "enum", "instanceof", "return", "transient",
    "catch", "extends", "int", "short", "try", "char", "final", "interface", "static", "void",
    "class", "finally", "long", "strictfp", "volatile", "const", "float", "native", "super", "while"
];
const pythonKeywords = [
    "False", "def", "if", "raise", "None", "del", "import", "return",
    "True", "elif", "in", "try", "and", "else", "is", "while",
    "as", "except", "lambda", "with", "assert", "finally", "nonlocal", "yield",
    "break", "for", "not", "class", "from", "or", "continue", "global", "pass"
]
const jsKeywords = [
    "abstract", "arguments", "await", "boolean", "break", "byte", "case", "catch",
    "char", "class", "const", "continue", "debugger", "default", "delete", "do",
    "double", "else", "enum", "eval", "export", "extends", "false", "final",
    "finally", "float", "for", "function", "goto", "if", "implements", "import",
    "in", "instanceof", "int", "interface", "let", "long", "native", "new", "null",
    "package", "private", "protected", "public", "return", "short", "static", "super",
    "switch", "synchronized", "this", "throw", "throws", "transient", "true", "try",
    "typeof", "var", "void", "volatile", "while", "with", "yield"
];
var keywords=cKeywords; //default selected

// language selection
var selectedLang = "C"; // default
var languages = document.querySelectorAll(".section ul li a");

// Add event listener to each anchor element
languages.forEach(function(link) {
    link.addEventListener("click", function(event) {
        // Remove current 'selected'
        languages.forEach(function(item) {
            item.removeAttribute("id");
        });

        // Add new 'selected'
        this.setAttribute("id", "selected");
        selectedLang = this.textContent;

        // update regex and keywords
        switch (selectedLang) {
            case 'C':
                regex = def_regex;
                keywords = cKeywords;
                break;
            case 'C++':
                regex = def_regex;
                keywords = cppKeywords;
                break;
            case 'Java':
                regex = def_regex;
                keywords = javaKeywords;
                break;
            case 'Python':
                regex = python_regex;
                keywords = pythonKeywords;
                break;
            case 'JavaScript':
                regex = def_regex;
                keywords = jsKeywords;
                break;
        }

    });
});


// Var Check
function varChecker(){
    // Retrieve the input value
    var input = document.getElementById("textbox").value;
    var result = document.getElementById("result");
    result.style.background = "rgba(0, 0, 0, 0.15)";

    if (regex.test(input) && !keywords.includes(input)) {
        result.textContent = `"${input}" is a Valid Variable Name for ${selectedLang}`;
        result.style.color = "lime";
        result.style.borderColor = "lime";
    }
    else {
        result.textContent = `"${input}" is not a Valid Variable Name for ${selectedLang}`;
        result.style.color = "red";
        result.style.borderColor = "red";
    }
}