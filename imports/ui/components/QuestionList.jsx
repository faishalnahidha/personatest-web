import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Divider from 'material-ui/Divider';

import QuestionItem from '../components/QuestionItem.jsx';

function QuestionList(props) {
  const updateAnswersHere = (index, value) => {
    props.updateAnswersToTestPage(index, value);
  };

  const { questionsPerPage, answersPerPage } = props;
  console.log('answersThisPage: ' + answersPerPage);

  return questionsPerPage.map((question, index) => (
    <div key={index}>
      <QuestionItem
        index={index}
        question={question}
        value={answersPerPage[index]}
        updateAnswersToQuestionList={updateAnswersHere.bind(this)}
      />
      <Divider />
    </div>
  ));
}

QuestionList.propTypes = {
  questionsPerPage: PropTypes.array.isRequired,
  questionStartIndex: PropTypes.number.isRequired,
  answersPerPage: PropTypes.array.isRequired,
  updateAnswersToTestPage: PropTypes.func.isRequired
};

export default QuestionList;
