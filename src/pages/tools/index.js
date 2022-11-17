import React from 'react';
import Layout from '@theme/Layout';
import styles from './tool-style.module.css';

export default function Tools() {
		
	const scoreHeader='Metaculus Scoring System';
	const scoreExplainer='An interactive tool to show and explain how different scoring systems used by Metaculus works and their relationship to your forecast.';
	const scoreUrl='https://www.metaculus.com/help/scoring/';
	const scoreImage='/faq/img/scoring-system.png';
	const scoreImageAlt='Image showing the Metaculus scoring system page';
	
	const resourcesHeader='Prediction Resources';
	const resourcesExplainer='Resources for making better forecasts and some commonly used data sources to support creating good questions and making informed forecasts.';
	const resourcesUrl='/faq/resources';
	const resourcesImage='/faq/img/prediction-resources.png';
	const resourcesImageAlt='Image showing the prediction resources page';
	
	const curatorToolHeader='Metaculus Question Curation Tool';
	const curatorToolExplainer='An automatic question creation checklist for use by both Curators and authors alike.';
	const curatorToolUrl='/faq/curation-response';
	const curatorToolImage='/faq/img/curation-response.png';
	const curatorToolImageAlt='Image showing the Metaculus question curation tool page';
	
  return (
    <Layout title="Tools and Resources" description="Tools and resources for forecasting on Metaculus">
      <div className={styles["container"]}>
	  <h1>Tools and Resources</h1>
		<p>Some tools and resources for use in writing good questions, understanding scoring, and finding valuable forecasting data.</p>
		
		<div className={styles["toolbox"]}>
			<ToolBox page="score" header={scoreHeader} explainer={scoreExplainer} url={scoreUrl} img={scoreImage} alt={scoreImageAlt} />
			
			<ToolBox page="resources" header={resourcesHeader} explainer={resourcesExplainer} url={resourcesUrl} img={resourcesImage} alt={resourcesImageAlt} />
			
			<ToolBox page="curatorTool" header={curatorToolHeader} explainer={curatorToolExplainer} url={curatorToolUrl} img={curatorToolImage} alt={curatorToolImageAlt} />
		</div>
      </div>
    </Layout>
  );
}

const ToolBox = (props) => (
	<div className={styles["postWrapper"]}>
		<a className={styles["linkWrapper"]} href={props.url}>
			<div className={styles["postImage"]}>
				{/*IDEALLY THIS SHOULD BE AN IMAGE PREVIEW OF THE PAGE AT SOME POINT BUT KEEPING IT SIMPLE FOR NOW */}
				<img src={props.img} alt={props.alt}/>
			</div>
			
			<div className={styles["postDetails"]}>
				<h3>{props.header}</h3>
				<p>{props.explainer}</p>
			</div>
		</a>
	
	</div>
)