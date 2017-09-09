import React from "react";
import { render } from "react-dom";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const SET_ITEMS = [
  {
    label: 1,
    selected: false
  },
  {
    label: 2,
    selected: false
  },
  {
    label: 3,
    selected: false
  },
  {
    label: 4,
    selected: false
  },
  {
    label: 5,
    selected: false
  },
  {
    label: 6,
    selected: false
  },
  {
    label: 7,
    selected: false
  },
  {
    label: 8,
    selected: false
  },
  {
    label: 9,
    selected: false
  }
];

const CHECK_ITEMS = [
  {
    label: 1,
    selected: false
  },
  {
    label: 2,
    selected: false
  },
  {
    label: 3,
    selected: false
  },
  {
    label: 4,
    selected: false
  },
  {
    label: 5,
    selected: false
  },
  {
    label: 6,
    selected: false
  },
  {
    label: 7,
    selected: false
  },
  {
    label: 8,
    selected: false
  },
  {
    label: 9,
    selected: false
  }
];

class Box extends React.Component {
  render() {
    const { index, name, selected, onSelect } = this.props;
    const boxStyles = {
      width: "50px",
      height: "50px"
    };
    if (selected === true) {
      boxStyles.backgroundColor = "red";
    } else {
      boxStyles.backgroundColor = "green";
    }
    return (
      <div style={boxStyles} onClick={() => onSelect(index)}>
        {name}
      </div>
    );
  }
}

class LockScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boxItems: SET_ITEMS,
      mode: "set",
      success: false
    };
  }

  onBoxClicked(index) {
    const items = this.state.boxItems;
    items[index].selected = !items[index].selected;
    this.setState({ boxItems: items });
  }

  onToggleClicked() {
    const mode = this.state.mode;
    if (mode === "set") {
      this.setState({ mode: "check", boxItems: CHECK_ITEMS });
    } else {
      this.setState({ mode: "set", boxItems: SET_ITEMS });
    }
  }

  onVerifyClicked() {
    var matches = true;
    for (var i = 0; i < 9; i++) {
      if (SET_ITEMS[i].selected !== CHECK_ITEMS[i].selected) {
        matches = false;
        break;
      }
    }
    this.setState({ success: matches });
  }

  render() {
    const items = this.state.boxItems;
    const mode = this.state.mode;
    const success = this.state.success;
    return (
      <div>
        <div>Current Mode - {mode}</div>
        <button
          style={{ marginTop: "30px" }}
          onClick={() => this.onToggleClicked()}
        >
          Toggle Mode
        </button>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px"
          }}
        >
          {items.map((item, index) => (
            <div>
              <Box
                index={index}
                name={item.label}
                selected={item.selected}
                onSelect={this.onBoxClicked.bind(this)}
              />
            </div>
          ))}
        </div>
        {mode === "check" && (
          <div>
            <button
              style={{ marginTop: "30px" }}
              onClick={() => this.onVerifyClicked()}
            >
              Verify
            </button>
          </div>
        )}
        {mode === "check" && (success ? "Success" : "Failure")}
      </div>
    );
  }
}

const App = () => (
  <div style={styles}>
    <LockScreen />
  </div>
);

render(<App />, document.getElementById("root"));
