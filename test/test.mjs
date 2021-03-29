//var assert = require('assert');
/**
 * Imports
 */
// Chai for assertions
import pkg_chai from "chai";
const { expect } = pkg_chai;

// JSDOM for DOM trees
import pkg_jsdom from "jsdom";
const { JSDOM } = pkg_jsdom;
import "jsdom-global";

//import file domppToKoalati
import DomppToKoalati from '../domppToKoalati.js'
console.log(DomppToKoalati);

// DataTree for tree management
//import pkg_datatree from "data-tree";
//const { dataTree } = pkg_datatree;

// Local imports
import { evaluateDom, getTreeFromWitness } from 'koalati-dompp';
import {
  ComposedFunction,
  CompoundDesignator,
  DimensionWidth,
  FindBySelector,
  GreaterThan,
  TestCondition,
  TestDriver,
  TestResult,
  UniversalQuantifier,
} from 'koalati-dompp';

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      //assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

describe("Witness tests", () => {
  it("Simple condition true", async () => {
    var f = new ComposedFunction(new GreaterThan(), "@0", 50);
    var cond = new TestCondition("A condition", f);
    var driver = new TestDriver(cond);
    driver.evaluateAll(100);
    var result = driver.getResult();
    expect(result).to.be.an.instanceof(TestResult);
    expect(result.getResult()).to.be.true;
    var verdicts = result.getVerdicts();
    expect(verdicts.length).to.equal(1);
    var verdict = verdicts[0];
    var witness = verdict.getWitness();
    expect(Array.isArray(witness)).to.be.true;
    expect(witness.length).to.equal(2);
    const trees = getTreeFromWitness(witness);
  });
  it("Simple condition false", async () => {
    var f = new ComposedFunction(new GreaterThan(), "@0", 50);
    var cond = new TestCondition("A condition", f);
    var driver = new TestDriver(cond);
    driver.evaluateAll(0);
    var result = driver.getResult();
    expect(result).to.be.an.instanceof(TestResult);
    expect(result.getResult()).to.be.false;
    var verdicts = result.getVerdicts();
    expect(verdicts.length).to.equal(1);
    var verdict = verdicts[0];
    var witness = verdict.getWitness();
    expect(Array.isArray(witness)).to.be.true;
    expect(witness.length).to.equal(2);
    const trees = getTreeFromWitness(witness);
  });
  it("Test", async () => {
    var dom = await load_dom("../dom-pp/test/pages/stub-1.html");
    var body = dom.window.document.body;
    var f = new UniversalQuantifier(
      "$x",
      new FindBySelector("#h2"),
      new ComposedFunction(
        new GreaterThan(),
        new ComposedFunction(new DimensionWidth(), "$x"),
        350
      )
    );

    var cond = new TestCondition("h2's width > 350", f);
    var driver = new TestDriver(cond);
    driver.evaluateAll(body);
    var result = driver.getResult();
    expect(result).to.be.an.instanceof(TestResult);
    expect(result.getResult()).to.be.false;
    var verdicts = result.getVerdicts();
    expect(verdicts.length).to.equal(1);
    var verdict = verdicts[0];
    var witness = verdict.getWitness();
    expect(Array.isArray(witness)).to.be.true;
    expect(witness.length).to.equal(2);
    const trees = getTreeFromWitness(witness);

    console.log(trees);

    //console.log(verdict);

    console.log('ok');
    var once = false
    var cssProperty, tagName, valueTest

    trees.traverser().traverseDFS(function(node){
      //node  = trees.rootNode()
      if(once == false){
        cssProperty = trees.rootNode().data().elementAttribute
        tagName = trees.rootNode().data().subject
        valueTest = trees.currentNode().data().subject

        //console.log(cssProperty, tagName, valueTest, verdict.condition.name);
        once = true
      }
      
    });
    

    //test for dom to kaolati
    //const cssProperty = trees._rootNode._data.elementAttribute
    //const tagName = trees._rootNode._data.subject
    //const valueTest = trees._currentNode._data.subject
    //console.log(trees._rootNode._data.elementAttribute);
    //console.log(cssProperty, tagName, valueTest, verdict.condition.name);

    let formatDomKoalati = new DomppToKoalati(cssProperty, tagName);
    formatDomKoalati.addResultKoalati(trees,verdict)
    const resultkoalatidom = formatDomKoalati.getResultKoalati();
    console.log(resultkoalatidom);
    
  });
});






/**
 * Reads a DOM from a file. This function is only meant to avoid cluttering
 * the code with promises and anonymous functions in every test case.
 * @param {String} filename The name of the local file to read from
 * @param A promise which, when fulfilled, returns the DOM object.
 */
async function load_dom(filename) {
  return JSDOM.fromFile(filename).then((dom) => {
    return dom;
  });
}