
const ResultBuilder = require('result-builder')
//console.log(ResultBuilder);

class DomppToKoalati {
    constructor(cssProperty, tagName) {
        this.cssProperty = cssProperty;
        this.tagName = tagName

        //Build result by result-builder
        this.builder = new ResultBuilder()
    }

    addResultKoalati(tree, verdict){
        //get the value to use as koalati results
        const cssProperty = tree._rootNode._data.elementAttribute
        const tagName = tree._rootNode._data.subject
        const valueTest = tree._currentNode._data.subject

        //use testCondition comme title (use verdicts)
        const title = verdict.condition.name

        //build result using ResultBuilder
        const result = this.builder.newTest(tagName)
        result.setTitle(title)
              .setDescription("Test performed on " +tagName + " with " + cssProperty + " and value" + valueTest)
    
    }


}