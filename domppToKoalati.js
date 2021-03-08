
const ResultBuilder = require('result-builder')
class DomppToKoalati {
    constructor(cssProperty, tagName) {
        this.cssProperty = cssProperty;
        this.tagName = tagName
        //Build result by result-builder
        this.builder = new ResultBuilder()
    }

    addResultKoalati(trees, verdict) {
        //this is a helper wich allows to cross the tree once
        var once = false
        var cssProperty, tagName, valueTest
        trees.traverser().traverseDFS(function (node) {
            if (once == false) {
                cssProperty = trees.rootNode().data().elementAttribute
                tagName = trees.rootNode().data().subject
                valueTest = trees.currentNode().data().subject
                //change value helper
                once = true
            }
        });
        /**
         * assigne value  for title and score
         */
        const title = verdict.condition.name //use testCondition like title (use verdicts)
        let score = 1 //score take two value: 1 if succes and 0 if fails 

        //build result using ResultBuilder
        const result = this.builder.newTest(tagName)
        result.setTitle(title)
            .setDescription("Test performed on " + tagName + " with " + cssProperty + " and value " + valueTest)
            .setScore(score)
    }

    getResultKoalati() {
        return this.builder.toArray()
    }
}

module.exports = DomppToKoalati;