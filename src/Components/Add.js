import React from 'react' // мы обязаны импортировать необходимые пакеты в каждом файле
//import PropTypes from 'prop-types' // у Article это react и prop-types


class Add extends React.Component {
  state = {
    name: "",
    text: "",
    bigText: "",
    agree: false
  };
  onBtnClickHandler = e => {
    e.preventDefault();
    const { name, text, bigText } = this.state;
    this.props.onAddNews({
      id: +new Date(),
      author: name,
      text,
      bigText
    });
  };
  handleChange = e => {
    const { id, value } = e.currentTarget;
    this.setState({ [id]: value });
  };
  handleCheckboxChange = e => {
    this.setState({ agree: e.currentTarget.checked });
  };
  validate = () => {
    const { name, text, agree } = this.state;
    if (name.trim() && text.trim() && agree) {
      return true;
    }
    return false;
  };
  render() {
    const { name, text, bigText } = this.state;
    return (
      <form className="add">
        <input
          id="name"
          type="text"
          onChange={this.handleChange}
          className="add__author"
          placeholder="Name"
          value={name}
        />
        <textarea
          id="text"
          onChange={this.handleChange}
          className="add__text"
          placeholder="News text"
          value={text}
        />
        <textarea
          id="bigText"
          onChange={this.handleChange}
          className="add__text"
          placeholder="Full news text"
          value={bigText}
        />
        <label className="add__checkrule">
          <input type="checkbox" onChange={this.handleCheckboxChange} />
          I'm agree with the rules
        </label>
        <button
          className="add__btn"
          onClick={this.onBtnClickHandler}
          disabled={!this.validate()}
        >
          Add News
        </button>
      </form>
    );
  }
}

export { Add }