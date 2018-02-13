import React, { Component } from 'react';
import PropTypes from 'prop-types';

import QuestionItem from '../components/QuestionItem.jsx';

class QuestionList extends Component {
  updateAnswersHere = (index, value) => {
    this.props.updateAnswersToTestPage(index, value);
  };

  render() {
    const { questionsPerPage, questionStartIndex, answersPerPage } = this.props;

    return questionsPerPage.map((question, index) => (
      <div key={question._id}>
        <QuestionItem
          index={index}
          number={questionStartIndex + index + 1}
          question={question}
          value={answersPerPage[index]}
          updateAnswersToQuestionList={this.updateAnswersHere}
        />
      </div>
    ));
  }
}

QuestionList.propTypes = {
  questionsPerPage: PropTypes.array.isRequired,
  questionStartIndex: PropTypes.number.isRequired,
  answersPerPage: PropTypes.array.isRequired,
  updateAnswersToTestPage: PropTypes.func.isRequired,
};

export default QuestionList;
