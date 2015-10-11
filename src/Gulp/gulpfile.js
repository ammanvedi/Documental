var gulp = require('gulp');
var modify = require('gulp-modify');
var print = require('gulp-print');
var acorn = require('acorn');
var walk = require('walk-ast');
var Documental = require('Documental');
var total = 0;

gulp.task('default', function () {
    //  '../../../irb-web/**/*.js'
    //  '../../../irb-web/widgets/archive-pools/src/js/Main.js'
    // common/src/lib/graphing/Graph.js
    // '../../../irb-web/common/src/lib/graphing/Graph.js'
    // ../../../irb-web/common/src/js/ObjectCreatePolyfill.js
    // ../../../irb-web/common/src/lib/tennis/graph/DrawCanvas.js
    // common/src/lib/common/koViewModels/cricket/MatchScheduleFilter.js
    // '../../../irb-web/common/src/lib/common/koViewModels/cricket/MatchScheduleFilter.js'
    gulp.src([ '../../../irb-web/**/*.js' ,'!../../../irb-web/tools/**', '!../../../irb-web/common/src/lib/3rd-party/**', '!../../../irb-web/**/**.min.js', '!../../../irb-web/storyboards/**'])
        .pipe(modify({
            fileModifier: function(file, contents) {

                Documental.UTIL.determineFunctions(contents, acorn, walk);

/*

                var ast = acorn.parse(contents, {
                    locations: true,
                    ranges: true,
                    directSourceFile: true
                });

                var methodCount = 0;

                function postorder(node)
                {
                    if(node.name)
                    {

                        return node.name;
                    }else{
                        if(node.type == 'ThisExpression')
                        {
                            return "this";
                        }else if(node.type == "Literal"){
                            return "[ LITERAL ]";
                        }else
                        {
                            return postorder(node.object) + "."  + postorder(node.property);
                        }

                    }
                }

                walk(ast, function(node){

                    //console.log(node.type);

                    // detect functions declared at runtime
                    if(node.type == 'FunctionDeclaration')
                    {
                        console.log("Method Declared : ", node.id.name);
                        methodCount++;
                    }
                    // detect functions declared as variables
                    if(node.type == 'VariableDeclaration')
                    {
                        //console.log(node.declarations);
                        node.declarations.forEach(function(declaration, declIndex){
                            //console.log(declaration);
                            if( declaration.init && declaration.init.type == 'FunctionExpression')
                            {
                                console.log("Method Declared : ", declaration.id.name);
                                methodCount++;
                            }
                        })
                    }

                    //detect functions created on prototypes and
                    if(node.type == 'ExpressionStatement')
                    {
                        if(node.expression && node.expression.left && node.expression.right && node.expression.left.type == 'MemberExpression'
                            &&  node.expression.right.type == 'FunctionExpression')
                        {
                            console.log("Method Declared : ", postorder(node.expression.left));
                            methodCount++;
                        }
                    }

                    //detect functions instatiated with a call expression
                    if(node.type)
                    {

                    }
                });

                console.log("\n\nDetected "  + methodCount + " methods in total...\n\n");
                total += methodCount;
                return contents;

                */


                return contents;
            }
        })).pipe(print(function(filepath) {
            //console.log(typeof Documental.UTIL);
            //console.log("TOTAL METHODS : " +  Documental.UTIL.getTotal());
            return " Finished Parsing : " + filepath + " - ( Overall " + Documental.UTIL.getTotal() +" Methods ) \n\n";


        }));

        //.pipe(gulp.dest('dist') );
});