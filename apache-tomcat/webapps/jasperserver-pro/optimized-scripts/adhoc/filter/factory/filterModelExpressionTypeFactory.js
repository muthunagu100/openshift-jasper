define(["require","adhoc/filter/enum/filterDataTypes","adhoc/filter/enum/filterExpressionTypes","adhoc/filter/enum/filterOperators","underscore"],function(E){var T=E("adhoc/filter/enum/filterDataTypes"),L=E("adhoc/filter/enum/filterExpressionTypes"),I=E("adhoc/filter/enum/filterOperators"),A=E("underscore"),R={};return R[T.STRING]={},R[T.STRING][I.IN]=L.LIST,R[T.STRING][I.NOT_IN]=L.LIST,R[T.STRING][I.EQUALS]=L.LITERAL,R[T.STRING][I.NOT_EQUAL]=L.LITERAL,R[T.STRING][I.CONTAINS]=L.LITERAL,R[T.STRING][I.NOT_CONTAINS]=L.LITERAL,R[T.STRING][I.STARTS_WITH]=L.LITERAL,R[T.STRING][I.NOT_STARTS_WITH]=L.LITERAL,R[T.STRING][I.ENDS_WITH]=L.LITERAL,R[T.STRING][I.NOT_ENDS_WITH]=L.LITERAL,R[T.NUMERIC]={},R[T.NUMERIC][I.IN]=L.LIST,R[T.NUMERIC][I.NOT_IN]=L.LIST,R[T.NUMERIC][I.EQUALS]=L.LITERAL,R[T.NUMERIC][I.NOT_EQUAL]=L.LITERAL,R[T.NUMERIC][I.LESS]=L.LITERAL,R[T.NUMERIC][I.GREATER]=L.LITERAL,R[T.NUMERIC][I.GREATER_OR_EQUAL]=L.LITERAL,R[T.NUMERIC][I.LESS_OR_EQUAL]=L.LITERAL,R[T.NUMERIC][I.BETWEEN]=L.RANGE,R[T.NUMERIC][I.NOT_BETWEEN]=L.RANGE,R[T.INTEGER]={},R[T.LONG]={},R[T.DECIMAL]={},A.extend(R[T.INTEGER],R[T.NUMERIC]),A.extend(R[T.LONG],R[T.NUMERIC]),A.extend(R[T.DECIMAL],R[T.NUMERIC]),R[T.BOOLEAN]={},R[T.BOOLEAN][I.IN]=L.LIST,R[T.BOOLEAN][I.NOT_IN]=L.LIST,R[T.BOOLEAN][I.EQUALS]=L.LITERAL,R[T.BOOLEAN][I.NOT_EQUAL]=L.LITERAL,R[T.TIMESTAMP]={},R[T.TIMESTAMP][I.EQUALS]=L.LITERAL,R[T.TIMESTAMP][I.NOT_EQUAL]=L.LITERAL,R[T.TIMESTAMP][I.LESS]=L.LITERAL,R[T.TIMESTAMP][I.GREATER]=L.LITERAL,R[T.TIMESTAMP][I.GREATER_OR_EQUAL]=L.LITERAL,R[T.TIMESTAMP][I.LESS_OR_EQUAL]=L.LITERAL,R[T.TIMESTAMP][I.BETWEEN_DATES]=L.DATE_RANGE,R[T.TIMESTAMP][I.NOT_BETWEEN_DATES]=L.DATE_RANGE,R[T.DATE]={},A.extend(R[T.DATE],R[T.TIMESTAMP]),R[T.TIME]={},R[T.TIME][I.EQUALS]=L.LITERAL,R[T.TIME][I.NOT_EQUAL]=L.LITERAL,R[T.TIME][I.LESS]=L.LITERAL,R[T.TIME][I.GREATER]=L.LITERAL,R[T.TIME][I.GREATER_OR_EQUAL]=L.LITERAL,R[T.TIME][I.LESS_OR_EQUAL]=L.LITERAL,R[T.TIME][I.BETWEEN]=L.RANGE,R[T.TIME][I.NOT_BETWEEN]=L.RANGE,R[T.READ_ONLY]={},R[T.READ_ONLY][I.READ_ONLY]=L.READ_ONLY,function(E,T){if(!(E in R))throw new Error("Filter data type '"+E+"' is not supported");if(!(T in R[E]))throw new Error("Operator '"+T+"' is not supported by filter data type '"+E+"'");return R[E][T]}});