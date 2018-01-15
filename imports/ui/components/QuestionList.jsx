import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Divider from 'material-ui/Divider';

import QuestionItem from '../components/QuestionItem.jsx';

class QuestionList extends Component {
  componentDidMount() {
    console.log('didMount');
  }

  componentWillEnter(callback) {
    console.log('willEnter');
  }

  updateAnswersHere = (index, value) => {
    this.props.updateAnswersToTestPage(index, value);
  };

  render() {
    const { questionsPerPage, questionStartIndex, answersPerPage } = this.props;
    console.log(`answersThisPage: ${answersPerPage}`);

    return questionsPerPage.map((question, index) => (
      <div key={question._id}>
        <QuestionItem
          index={index}
          number={questionStartIndex + index + 1}
          question={question}
          value={answersPerPage[index]}
          updateAnswersToQuestionList={this.updateAnswersHere}
        />
        <Divider />
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
