import React, { Component, useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import styles from './mod-style.module.css';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

//set some variables to use to track responses and visibilities and selections throughout
var response = [];
var responseOut = [];
var radioLogger = [];
var visibilityStatus = Array(6).fill('hide');

//get text responses for each question from csv
function getResponseData() {
	return fetch('/faq/file/responses.csv')
	.then((res) => res.text())
	.then((data) => {
		return data;
	});
}

async function caller() {
	response = $.csv.toArrays(await getResponseData());
	console.log(response);
	for (let i = 0; i <= response.length - 1; i++) {
		if(i == '0') {
			response[i].push("Status");
		} else {
			response[i].push("0");
		}
	}
	
	return 'done';
}



// I think the below was from an older attempt to figure out how to get radio button output and is no longer needed, commented out but leaving it in case something is broken and I just haven't noticed it yet.
/*
class Demo1 extends Component {
  constructor() {
    super();
    this.state = {
      name: "React"
    };
    this.radioChange = this.radioChange.bind(this);
  }
}
*/

export default function ModTool() {
	
	const [divView, setDivView] = useState(Array(6).fill(false));
	const [userText, setUserText] = useState('');
	const [modText, setModText] = useState('');
	const [containerID, setContainerID] = useState('containerInit');
	
	const steps = {
	  0: "banner-initial",
	  1: "message-banner",
	  2: "banner-hide"
	};
	
	const [animationStepUser, setAnimationStepUser] = useState(0);
	const [animationStepMod, setAnimationStepMod] = useState(0);
	
	const fadeMessage = (type) => {
		//console.log("getting here");
		//console.log(type);

		if (type == 'user') {
			setAnimationStepUser(1);
			setTimeout(() => {
			  setAnimationStepUser(2);
			}, 500);
		} else if (type == 'mod') {
			setAnimationStepMod(1);
			setTimeout(() => {
				  setAnimationStepMod(2);
			}, 500);
		}
	  };
	  
	// The useEffect below is used both to wait until jquery is loaded before calling caller() as well as preventing clicks (using setContainerID) before the csv has been loaded in, preventing errors.
	useEffect(() => {
		caller().then((value) => {
			if(value == 'done'){
				setContainerID('container');
			}
		});
	}, []);
	
	return (
	
	<Layout>
	
	{/*<Layout> imported from react (also see imports at top) gives page the docusaurus headers*/}
	
	<section>

	<div id={styles[containerID]}>
	
		<h1 id={styles["heading"]}>Metaculus Interactive Curator Response Tool</h1>
		
		<p>Use this tool to check if a question follows the Metaculus guidelines for what constitutes a good question. This tool can be by Curators to check over questions and copy some standard responses for users. But it's also recommended that question authors use it to check their questions. By using this tool question authors will be able to see what feedback Curators will have on their question and fix it prior to submitting it for review.</p>
		
		<hr />

		<div id={styles["left_div"]} onChange={() => {var newArray = outputText(event, visibilityStatus); var visibleBools = newArray[0]; visibilityStatus = newArray[1]; setDivView([...visibleBools]); setUserText(newArray[2]); setModText(newArray[3]) }}>

			<p>Is this question ready for Curator review?</p>
			
			{/*see here for why styles are shown in [] https://stackoverflow.com/questions/63530862/is-there-a-way-to-style-an-element-in-react-using-the-id-without-using-classname */}
			
			<label htmlFor={styles["stub_yes"]}><input type="radio" id={styles["stub_yes"]} name="stub" value="Yes" /><span>Yes</span></label>
			<label htmlFor={styles["stub_no"]}><input type="radio" id={styles["stub_no"]} name="stub" value="No" /><span>No</span></label>
			
			<SuitableDivComp display = { divView[0] } />
			
			<EffortDivComp display = { divView[1] } />
			
			<QuestionDivComp viewBooleans = { divView } display = { divView[2] } />
			
		</div>

		<div id={styles["right_div"]}>
			
			<div id={styles["user_div"]}>
			
				<p>The following feedback can be <b>edited</b> and then copied and pasted to the user:</p>

				<textarea id={styles["user_feedback"]} value={userText} onChange={(e) => setUserText(e.target.value)} /* onInput={function(event){ this.style.height = ""; this.style.height = this.scrollHeight + 3 + "px"}}*/></textarea>
				
				<button onClick={() => {fadeMessage("user"); copyUserFeedback(userText)}}><p>Copy text</p></button>
				
				<CopiedText classes={steps[animationStepUser]} />

			</div>

			<div id={styles["mod_div"]}>
			
				<p>The following feedback is typically minor enough that mods can handle it, though may be copied below the user feedback if desired:</p>

				<textarea id={styles["mod_feedback"]} value={modText} onChange={(e) => setModText(e.target.value)} /* onInput={function(event){ this.style.height = ""; this.style.height = this.scrollHeight + 3 + "px"}}*/></textarea>
				
				<button onClick={() => {fadeMessage("mod"); copyModFeedback(modText)}}><p>Copy text</p></button>
				
				<CopiedText classes={steps[animationStepMod]} />
			</div>

		</div>

	</div>
	
	</section>
	
	</Layout>
	);
}

const CopiedText = (props) => {
	//console.log(props.classes);
	return (
	<div className={styles[props.classes]}>
		<p><i>Copied to clipboard!</i></p>
	</div>
	)
}

const SuitableDivComp = (props) => (
	<div id={styles["suitable_div"]} style={{display: (props.display ? 'block' : 'none')}}>
		<p>Is this question of general interest or otherwise fit with the <a href="https://www.metaculus.com/help/faq/#question-submission">topics Metaculus typically hosts</a>?</p>
		<label htmlFor={styles["suitable_yes"]}><input type="radio" id={styles["suitable_yes"]} name="suitable" value="Yes" /><span>Yes</span></label>
		<label htmlFor={styles["suitable_no"]}><input type="radio" id={styles["suitable_no"]} name="suitable" value="No" /><span>No</span></label>
	</div>
	
)

const EffortDivComp = (props) => (
		<div id={styles["effort_div"]} style={{display: (props.display ? 'block' : 'none')}}>
			<p>Will the question require less than around 15 minutes of Admin effort to resolve it, or is the question otherwise important enough to justify the level of Admin effort required?</p>
			<label htmlFor={styles["effort_yes"]}><input type="radio" id={styles["effort_yes"]} name="effort" value="Yes" /><span>Yes</span></label>
			<label htmlFor={styles["effort_no"]}><input type="radio" id={styles["effort_no"]} name="effort" value="No" /><span>No</span></label>
		</div>
)

const QuestionDivComp = (props) => {
	
	return (
	
		<div id={styles["question_div"]} style={{display: (props.display ? 'block' : 'none')}}>
			
			
			<p>Is the background material sufficient?</p>
			  <label htmlFor={styles["background_yes"]}><input type="radio" id={styles["background_yes"]} name="background" value="Yes" /><span>Yes</span></label>
			  <label htmlFor={styles["background_no"]}><input type="radio" id={styles["background_no"]} name="background" value="No" /><span>No</span></label>
			
			
			<p>Does the background have links to back up sources? (also check to make sure the links work)</p>
			  
			  <label htmlFor={styles["links_yes"]}><input type="radio" id={styles["links_yes"]} name="links" value="Yes" /><span>Yes</span></label>
			  <label htmlFor={styles["links_no"]}><input type="radio" id={styles["links_no"]} name="links" value="No" /><span>No</span></label>
			
			<p>Are all parts of the question background and resolution criteria original, or if parts are taken from other sources are Wikipedia are they clearly quoted and attributed?</p>
			  
			  <label htmlFor={styles["copy_yes"]}><input type="radio" id={styles["copy_yes"]} name="copy" value="Yes" /><span>Yes</span></label>
			  <label htmlFor={styles["copy_no"]}><input type="radio" id={styles["copy_no"]} name="copy" value="No" /><span>No</span></label>
			  
			<p>Are the dates formatted correctly (e.g. "January 1, 2040")</p>
			  <label htmlFor={styles["date_format_yes"]}><input type="radio" id={styles["date_format_yes"]} name="date_format" value="Yes" /><span>Yes</span></label>
			  <label htmlFor={styles["date_format_no"]}><input type="radio" id={styles["date_format_no"]} name="date_format" value="No" /><span>No</span></label>
			  
			<p>Does the question have an authoritative and clear resolution source?</p>
			<label htmlFor={styles["resolution_source_yes"]}><input type="radio" id={styles["resolution_source_yes"]} name="resolution_source" value="Yes" /><span>Yes</span></label>
			<label htmlFor={styles["resolution_source_no"]}><input type="radio" id={styles["resolution_source_no"]} name="resolution_source" value="No" /><span>No</span></label>

			<p>Does the question have a clear and unambiguous resolution method?</p>
			<label htmlFor={styles["resolution_method_yes"]}><input type="radio" id={styles["resolution_method_yes"]} name="resolution_method" value="Yes" /><span>Yes</span></label>
			<label htmlFor={styles["resolution_method_no"]}><input type="radio" id={styles["resolution_method_no"]} name="resolution_method" value="No" /><span>No</span></label>

			<p>Does the question have one or more categories assigned?</p>
			<label htmlFor={styles["categories_yes"]}><input type="radio" id={styles["categories_yes"]} name="categories" value="Yes" /><span>Yes</span></label>
			<label htmlFor={styles["categories_no"]}><input type="radio" id={styles["categories_no"]} name="categories" value="No" /><span>No</span></label>

			<p>Does the question provide a date by which it resolves in the resolution criteria?</p>
			<label htmlFor={styles["resolution_date_yes"]}><input type="radio" id={styles["resolution_date_yes"]} name="resolution_date" value="Yes" /><span>Yes</span></label>
			<label htmlFor={styles["resolution_date_no"]}><input type="radio" id={styles["resolution_date_no"]} name="resolution_date" value="No" /><span>No</span></label>

			<p>Does the question background and resolution criteria present the information neutrally?</p>
			<label htmlFor={styles["neutral_yes"]}><input type="radio" id={styles["neutral_yes"]} name="neutral" value="Yes" /><span>Yes</span></label>
			<label htmlFor={styles["neutral_no"]}><input type="radio" id={styles["neutral_no"]} name="neutral" value="No" /><span>No</span></label>
			
			<p>Is the question close date appropriate (set to just prior to the resolution date for most questions)?</p>
			<label htmlFor={styles["close_date_yes"]}><input type="radio" id={styles["close_date_yes"]} name="close_date" value="Yes" /><span>Yes</span></label>
			<label htmlFor={styles["close_date_no"]}><input type="radio" id={styles["close_date_no"]} name="close_date" value="No" /><span>No</span></label>
			
			<p>Is the resolution criteria free from inappropriate retroactive closure specification?</p>
			<label htmlFor={styles["retroactive_yes"]}><input type="radio" id={styles["retroactive_yes"]} name="retroactive" value="Yes" /><span>Yes</span></label>
			<label htmlFor={styles["retroactive_no"]}><input type="radio" id={styles["retroactive_no"]} name="retroactive" value="No" /><span>No</span></label>
			  
			<p>What type of question is it?</p>
			  <label htmlFor={styles["Binary"]}><input type="radio" id={styles["Binary"]} name="question_type" value="Binary" /><span>Binary</span></label>
			  <label htmlFor={styles["Numeric Range"]}><input type="radio" id={styles["Numeric Range"]} name="question_type" value="Numeric Range" /><span>Numeric Range</span></label>
			  <label htmlFor={styles["Date Range"]}><input type="radio" id={styles["Date Range"]} name="question_type" value="Date Range" /><span>Date Range</span></label>
			  
			  <BinaryDivComp display = { props.viewBooleans[3] } />
			  
			  <NumericDivComp display = { props.viewBooleans[4] } />
			  
			  <DateDivComp display = { props.viewBooleans[5] } />
			  
		</div>
	)
}

const BinaryDivComp = (props) => (
	<div id={styles["binary_div"]} style={{display: (props.display ? 'block' : 'none')}}>
		<p><b>You're working on a binary question</b></p>
		
		<p>Does the question resolution criteria use <b>Yes</b>, <b>No</b>, and <b>Ambiguous</b> formatting and clearly state what produces these resolution conditions?</p>
		<label htmlFor={styles["binary_formatting_yes"]}><input type="radio" id={styles["binary_formatting_yes"]} name="binary_formatting" value="Yes" /><span>Yes</span></label>
		<label htmlFor={styles["binary_formatting_no"]}><input type="radio" id={styles["binary_formatting_no"]} name="binary_formatting" value="No" /><span>No</span></label>

	</div>
)

const NumericDivComp = (props) => (
	<div id={styles["numeric_range_div"]} style={{display: (props.display ? 'block' : 'none')}}>
		<p><b>You're working on a numeric range question</b></p>

		<p>Is the numeric range reasonable and are the boundaries correctly specified?</p>
		<label htmlFor={styles["num_range_yes"]}><input type="radio" id={styles["num_range_yes"]} name="num_range" value="Yes" /><span>Yes</span></label>
		<label htmlFor={styles["num_range_no"]}><input type="radio" id={styles["num_range_no"]} name="num_range" value="No" /><span>No</span></label>

	</div>
)

const DateDivComp = (props) => (
	<div id={styles["date_range_div"]} style={{display: (props.display ? 'block' : 'none')}}>
		<p><b>You're working on a date range question</b></p>
		
		<p>Is the date range reasonable and are the boundaries correctly specified?</p>
		<label htmlFor={styles["date_range_yes"]}><input type="radio" id={styles["date_range_yes"]} name="date_range" value="Yes" /><span>Yes</span></label>
		<label htmlFor={styles["date_range_no"]}><input type="radio" id={styles["date_range_no"]} name="date_range" value="No" /><span>No</span></label>
	</div>
)

function divVisibility(event, visibleComps) {
	
	var suitableStatus = visibleComps[0];
	var effortStatus = visibleComps[1];
	var questionStatus = visibleComps[2];
	var binaryStatus = visibleComps[3];
	var numericStatus = visibleComps[4];
	var dateStatus = visibleComps[5];
	
	//console.log('event target value = ' + event.target.value + '. Event target name = ' + event.target.name + '. suitableStatus = ' + suitableStatus + '. And get index for radio logger for stub = ' + getIndex(radioLogger, "stub")[1] + '. And get index radio logger for suitable = ' + getIndex(radioLogger, "suitable")[1]);
	
	if(event.target.value == 'Yes' && event.target.name == 'stub'){
		//console.log("got here");
		suitableStatus = 'show';
		if(getIndex(radioLogger, "suitable")[1] == "Yes") {
			effortStatus = 'show';
			if(getIndex(radioLogger, "effort")[1] == "Yes") {
				questionStatus = 'show';
			}
		}
	}else if(event.target.value == 'No' && event.target.name == 'stub'){
		suitableStatus = 'hide';
		effortStatus = 'hide';
		questionStatus = 'hide';
	}else if(event.target.value == 'Yes' && event.target.name == 'suitable' && getIndex(radioLogger, "stub")[1] == "Yes"){
		effortStatus = 'show';
		if(getIndex(radioLogger, "stub")[1] == "Yes" && getIndex(radioLogger, "effort")[1] == "Yes") {
			questionStatus = 'show';
		}
	}else if(event.target.value == 'Yes' && event.target.name == 'effort' && getIndex(radioLogger, "stub")[1] == "Yes" && getIndex(radioLogger, "suitable")[1] == "Yes"){
		questionStatus = 'show';
	}else if(event.target.value == 'No' && event.target.name == 'suitable'){
		effortStatus = 'hide';
		questionStatus = 'hide';
	}else if(event.target.value == 'No' && event.target.name == 'effort'){
		questionStatus = 'hide';
	}else if(event.target.value == 'Binary' && event.target.name == 'question_type'){
		binaryStatus = 'show';
		numericStatus = 'hide';
		dateStatus = 'hide';
	}else if(event.target.value == 'Numeric Range' && event.target.name == 'question_type'){
		binaryStatus = 'hide';
		numericStatus = 'show';
		dateStatus = 'hide';
	} else if(event.target.value == 'Date Range' && event.target.name == 'question_type'){
		binaryStatus = 'hide';
		numericStatus = 'hide';
		dateStatus = 'show';
	}
	
	return [suitableStatus, effortStatus, questionStatus, binaryStatus, numericStatus, dateStatus];
}

function outputText(event, visibleVar) {
	
	var statusArray = [];
	
	if (getIndex(radioLogger, event.target.name)[0] !== -1) {
		radioLogger.splice(getIndex(radioLogger, event.target.name)[0], 1);
	}
	
	radioLogger.push([event.target.name, event.target.value]);
	
	var statusList = divVisibility(event, visibleVar);

	//is question ready for review
	if (getIndex(radioLogger, "stub")[1] == "Yes") {
		response[1][4] = "0";
	} else if (getIndex(radioLogger, "stub")[1] == "No") {
		response[1][4] = "1";
	}
	
	//sufficient background material
	if (getIndex(radioLogger, "background")[1] == "Yes") {
		response[3][4] = "0";
	} else if (getIndex(radioLogger, "background")[1] == "No") {
		response[3][4] = "1";
	}
	
	//background links
	if (getIndex(radioLogger, "links")[1] == "Yes") {
		response[4][4] = "0";
	} else if (getIndex(radioLogger, "links")[1] == "No") {
		response[4][4] = "1";
	}
	
	//source attribution and quotes
	if (getIndex(radioLogger, "copy")[1] == "Yes") {
		response[5][4] = "0";
	} else if (getIndex(radioLogger, "copy")[1] == "No") {
		response[5][4] = "1";
	}
	
	//source attribution and quotes
	if (getIndex(radioLogger, "date_format")[1] == "Yes") {
		response[6][4] = "0";
	} else if (getIndex(radioLogger, "date_format")[1] == "No") {
		response[6][4] = "1";
	}
	
	//clear resolution source
	if (getIndex(radioLogger, "resolution_source")[1] == "Yes") {
		response[7][4] = "0";
	} else if (getIndex(radioLogger, "resolution_source")[1] == "No") {
		response[7][4] = "1";
	}
	
	//clear resolution method
	if (getIndex(radioLogger, "resolution_method")[1] == "Yes") {
		response[8][4] = "0";
	} else if (getIndex(radioLogger, "resolution_method")[1] == "No") {
		response[8][4] = "1";
	}
	
	//categories assigned
	if (getIndex(radioLogger, "categories")[1] == "Yes") {
		response[9][4] = "0";
	} else if (getIndex(radioLogger, "categories")[1] == "No") {
		response[9][4] = "1";
	}
	
	//resolution date
	if (getIndex(radioLogger, "resolution_date")[1] == "Yes") {
		response[10][4] = "0";
	} else if (getIndex(radioLogger, "resolution_date")[1] == "No") {
		response[10][4] = "1";
	}
	
	//neutral tone
	if (getIndex(radioLogger, "neutral")[1] == "Yes") {
		response[11][4] = "0";
	} else if (getIndex(radioLogger, "neutral")[1] == "No") {
		response[11][4] = "1";
	}
	
	//close date
	if (getIndex(radioLogger, "close_date")[1] == "Yes") {
		response[12][4] = "0";
	} else if (getIndex(radioLogger, "close_date")[1] == "No") {
		response[12][4] = "1";
	}
	
	//retroactive closure
	if (getIndex(radioLogger, "retroactive")[1] == "Yes") {
		response[13][4] = "0";
	} else if (getIndex(radioLogger, "retroactive")[1] == "No") {
		response[13][4] = "1";
	}
	
	//binary resolution formatting
	if (getIndex(radioLogger, "binary_formatting")[1] == "Yes" && getIndex(radioLogger, "question_type")[1] == "Binary") {
		response[14][4] = "0";
	} else if (getIndex(radioLogger, "binary_formatting")[1] == "No" && getIndex(radioLogger, "question_type")[1] == "Binary") {
		response[14][4] = "1";
	}
	
	//numeric range appropriate
	if (getIndex(radioLogger, "num_range")[1] == "Yes" && getIndex(radioLogger, "question_type")[1] == "Numeric Range") {
		response[15][4] = "0";
	} else if (getIndex(radioLogger, "num_range")[1] == "No" && getIndex(radioLogger, "question_type")[1] == "Numeric Range") {
		response[15][4] = "1";
	}
	
	//date range appropriate
	if (getIndex(radioLogger, "date_range")[1] == "Yes" && getIndex(radioLogger, "question_type")[1] == "Date Range") {
		response[16][4] = "0";
	} else if (getIndex(radioLogger, "date_range")[1] == "No" && getIndex(radioLogger, "question_type")[1] == "Date Range") {
		response[16][4] = "1";
	}
	
	//question topic
	if (getIndex(radioLogger, "suitable")[1] == "Yes") {
		response[17][4] = "0";
	} else if (getIndex(radioLogger, "suitable")[1] == "No") {
		response[17][4] = "1";
	}
	
	//admin effort
	if (getIndex(radioLogger, "effort")[1] == "Yes") {
		response[18][4] = "0";
	} else if (getIndex(radioLogger, "effort")[1] == "No") {
		response[18][4] = "1";
	}
	
	
	//create the output text strings
	var user_output = "";
	var mod_output = "";
	
	if (response[1][4] == "1") {
		user_output = response[1][2];
	} else if (response[17][4] == "1") {
		user_output = response[17][2];
	} else if (response[18][4] == "1") {
		user_output = response[18][2];
	} else {
		for (let i = 2; i <= 13; i++) {
			if (response[i][3] == "User" && response[i][4] == "1") {
				user_output = user_output.concat(response[i][2],"\n\n");
			} else if (response[i][3] == "Mod" && response[i][4] == "1") {
				mod_output = mod_output.concat(response[i][2],"\n\n");
			}
		}
	
		//check for question type and add appropriate responses from that type
		if (getIndex(radioLogger, "question_type")[1] == "Binary" && response[14][4] == "1") {
			if (response[14][3] == "User") {
				user_output = user_output.concat(response[14][2],"\n\n");
			} else if (response[14][3] == "Mod") {
				mod_output = mod_output.concat(response[14][2],"\n\n");
			}
		} else if (getIndex(radioLogger, "question_type")[1] == "Numeric Range" && response[15][4] == "1") {
			if (response[15][3] == "User") {
				user_output = user_output.concat(response[15][2],"\n\n");
			} else if (response[15][3] == "Mod") {
				mod_output = mod_output.concat(response[15][2],"\n\n");
			}
		} else if (getIndex(radioLogger, "question_type")[1] == "Date Range" && response[16][4] == "1") {
			if (response[16][3] == "User") {
				user_output = user_output.concat(response[16][2],"\n\n");
			} else if (response[16][3] == "Mod") {
				mod_output = mod_output.concat(response[16][2],"\n\n");
			}
		} 
		
		if (user_output != "") {
			user_output = response[2][2].concat("\n\n",user_output);
		}
	}
	
	
	for (var i = 0; i < statusList.length; i++) {
			if (statusList[i] == 'show') {
				statusArray[i] = true;
			} else if (statusList[i] == 'hide') {
				statusArray[i] = false;
			}
		}
		
	//console.log(statusArray);
	
	return [statusArray, statusList, user_output, mod_output];
	
}
	
function getIndex(radioArray, eventName) {
		var index = -1;
		var checkedStatus = '';
		//console.log(radioArray);
		
		for (var i = 0; i < radioArray.length; i++) {
			
			if (radioArray[i][0] == eventName) {
				index = i;
			}
		}
		
		if (index != -1) {
				checkedStatus = radioArray[index][1];
		}
		
		return [index, checkedStatus];
}
	
function copyUserFeedback(userCopy) {
  navigator.clipboard.writeText(userCopy);
}

function copyModFeedback(modCopy) {
  navigator.clipboard.writeText(modCopy);
}