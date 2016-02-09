var app = angular.module( 'PulseDocs' );

app.factory( 'typeParserService', function() {

	var parseUnionType  = function( unionType ) {
		var typeString = "";

		if( unionType.elements && unionType.elements.length ) {

			for( var x = 0; x < unionType.elements.length; x++ ) {
				typeString += typeString.length > 0 ? " OR " + parseType( unionType.elements[ x ], typeString ) : parseType( unionType.elements[ x ], typeString );

			}
		};

		return typeString;
	};

	var parseRecordType  = function( recordType ) {
		var typeString = "";

		typeString += "Object { "

		if( recordType.fields && recordType.fields.length ) {

			for( var x = 0; x < recordType.fields.length; x++ ) {

				typeString += parseType( recordType.fields[ x ] );

				if( recordType.fields[ x + 1 ] ) {
					typeString += ", "
				}
			}
		};

		typeString += " } ";

		return typeString;
	};

	var parseFieldType  = function( fieldType ) {
		var typeString = "";

		typeString += fieldType.key + " : " + parseType( fieldType.value );

		return typeString;
	};

	var parseOptionalType  = function( optionalType ) {
		var typeString = "";

		typeString += "( optional ) " +  parseType( optionalType.expression );

		return typeString;
	};

	var parseTypeApplication = function( application ) {
		var typeString = "";

		typeString += parseType( application.expression ) + "< "

		for( var y = 0; y < application.applications.length; y++ ) {
			typeString +=  parseType( application.applications[ y ] );

			if( application.applications[ y + 1 ] ) {
				typeString += ", "
			}

		}

		typeString += " >";

		return typeString;
	};


	var parseType  = function( type, typeString ) {
		typeString = typeString || "";

		if( type ) {

			//switch based on root type
			switch( type.type ) {
				case 'UnionType':
					return parseUnionType( type );
					break;
				case 'TypeApplication':
					return parseTypeApplication( type );
					break;
				case 'RecordType':
					return parseRecordType( type );
					break;
				case 'OptionalType':
					return parseOptionalType( type );
					break;
				case 'FieldType':
					return parseFieldType( type );
					break;
				case 'NameExpression':
					return type.name
					break;
			}
		} else {

			return " ( No Type ) "

		}

	};

	return parseType

} );