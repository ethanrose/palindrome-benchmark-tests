import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';



var words = "The sky above the port was the color of television, tuned to a dead channel. All this happened, more or less. I had the story, bit by bit, from various people, and, as generally happens in such cases, each time it was a different story. It was a pleasure to burn.";




class App extends Component {
  constructor() {
    super();
    this.state = {
      log: []
    }
  }

  test1(str) {
    var norm = str.toLowerCase().replace(/[\W_+]/g, "").split("");
    return norm.join("") === norm.reverse().join("");
  }
  test2(str) {
    str = str.replace(/_|\W/g,'').toLowerCase();
    for (var i=0;i<=(str.length-1)/2;i++) if (str[i] !== str[str.length-1-i]) return false;
    return true;
  }
  test3(str) {
    let front = 0
    let back = str.length - 1

    while (back > front) {
      if ( str[front].match(/[\W_]/) ) {
        front++
        continue
      }
      if ( str[back].match(/[\W_]/) ) {
        back--
        continue
      }
      if ( str[front].toLowerCase() !== str[back].toLowerCase() ) return false
      front++
      back--
    }
    return true
  }

  makePalindrome(numOfChars){
      let wordArr = words.split(' ')
      let newWords = []
      let avgWordLength = words.length/wordArr.length
      for (let i = 0; i < numOfChars/avgWordLength/2; i++) {
        let randomWord = wordArr[Math.floor(Math.random()*wordArr.length)]
        newWords.push(randomWord)
      }
      return newWords.join(' ') + newWords.join('').split('').reverse().join('');
  }
  makeString(numOfChars){
      let wordArr = words.split(' ')
      let newWords = []
      let avgWordLength = words.length/wordArr.length
      for (let i = 0; i < numOfChars/avgWordLength; i++) {
        let randomWord = wordArr[Math.floor(Math.random()*wordArr.length)]
        newWords.push(randomWord)
      }
      return newWords.join(' ');
  }


  bench(title, time) { 
    let log = this.state.log
    log.push({title: title, time: time})
    this.setState({log: log}) 
  }

  //run the tests
  runTests1(str){
    var t0 = performance.now()
    for (let i = 0; i < 10; i++) this.test1(str)
    var t1 = performance.now()
    return t1-t0
  }
  logTest1(){
    this.bench('performing test 1', '......................')
    this.bench('100 chars, true', this.runTests1(this.makePalindrome(100)))
    this.bench('100 chars, false', this.runTests1(this.makeString(100)))
    this.bench('1,000 chars, true', this.runTests1(this.makePalindrome(1000)))
    this.bench('1,000 chars, false', this.runTests1(this.makeString(1000)))
    this.bench('4,000,000 chars, true', this.runTests1(this.makePalindrome(4000000)))
    this.bench('4,000,000 chars, false', this.runTests1(this.makeString(4000000)))
  }

  runTests2(str){
    var t0 = performance.now()
    for (let i = 0; i < 10; i++) this.test2(str)
    var t1 = performance.now()
    return t1-t0
  }
  logTest2(){
    this.bench('performing test 2', '......................')
    this.bench('100 chars, true', this.runTests2(this.makePalindrome(100)))
    this.bench('100 chars, false', this.runTests2(this.makeString(100)))
    this.bench('1,000 chars, true', this.runTests2(this.makePalindrome(1000)))
    this.bench('1,000 chars, false', this.runTests2(this.makeString(1000)))
    this.bench('4,000,000 chars, true', this.runTests2(this.makePalindrome(4000000)))
    this.bench('4,000,000 chars, false', this.runTests2(this.makeString(4000000)))
  }

  runTests3(str){
    var t0 = performance.now()
    for (let i = 0; i < 10; i++) this.test3(str)
    var t1 = performance.now()
    return t1-t0
  }
  logTest3(){
    this.bench('performing test 3', '......................')
    this.bench('100 chars, true', this.runTests3(this.makePalindrome(100)))
    this.bench('100 chars, false', this.runTests3(this.makeString(100)))
    this.bench('1,000 chars, true', this.runTests3(this.makePalindrome(1000)))
    this.bench('1,000 chars, false', this.runTests3(this.makeString(1000)))
    this.bench('4,000,000 chars, true', this.runTests3(this.makePalindrome(4000000)))
    this.bench('4,000,000 chars, false', this.runTests3(this.makeString(4000000)))
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <h4>Benchmarks for Palindrome functions</h4>
            <p>

              <div id="test1" className="test-summary">
              <b>test1: </b>
              Most consice solution. Performs replace(), split(), reverse(), join(), and toLowerCase() before comparing the entire strings against each other<br/>
              <pre><code>
              {`var norm = str.toLowerCase().replace(/[\W_+]/g, "").split("");
return norm.join("") === norm.reverse().join("");`}
              </code></pre>
              <a href="#" className="btn btn-info test-btn" onClick={()=>this.logTest1()}>Run Test 1</a>
              </div><br/>

              <div id="test2" className="test-summary">
              <b>test2: </b>
              Performs a str.replace() and str.toLowerCase() before iterating over a for loop<br/>
              <pre><code>
              {`str = str.replace(/_|\W/g,'').toLowerCase();
for (var i=0;i<=(str.length-1)/2;i++) if (str[i] !== str[str.length-1-i]) return false;
return true;`}
              </code></pre>
              <a href="#" className="btn btn-info test-btn" onClick={()=>this.logTest2()}>Run Test 2</a>
              <br/>
              </div><br/>

              <div id="test3" className="test-summary">
              <b>test3: </b>
              Lowest cyclomatic complexity. Only iterates over a while loop and compares one letter at a time. Theoretically the best performing option
              <pre><code>
              {`let front = 0, back = str.length - 1
while (back > front) {
if ( str[front].match(/[\W_]/) ) { front++; continue; }
if ( str[back].match(/[\W_]/) ) { back--; continue; }
if ( str[front].toLowerCase() !== str[back].toLowerCase() ) return false
front++
back--
}
return true`}
            </code></pre>
            <a href="#" className="btn btn-info test-btn" onClick={()=>this.logTest3()}>Run Test 3</a>
            </div>

            </p>
          </div>

          <div className="col-sm-6">
              <h4>Benchmark Results</h4>
              <small>
              Time reflects each test performed 10 times in ms.<br/>
              Click on a test to run it, and see the results below.<br/>
              <b>Note: Your browser may become unresponsive for a few seconds during tests</b>
              </small>
              
            <div id="log">
              <ul>
              {this.state.log.map( (item, i)=>{
                  return <li key={i}><b>{item.title}:</b> <i>{item.time}</i></li>
                })
              }
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
