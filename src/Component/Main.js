import React, { useState, useEffect } from "react";
import "./../App.css";

const Main = () => {
  // <--------------------------arr ------------------------------->
  // Upper case Character Arr
  const uppeerCaseChars = [];
  for (let i = 65; i <= 90; i++) {
    uppeerCaseChars.push(String.fromCharCode(i));
  }

  // lower case Character Arr
  const lowerCaseChars = [];
  for (let i = 97; i <= 122; i++) {
    lowerCaseChars.push(String.fromCharCode(i));
  }

  //numbers Arr
  const numChars = [];
  for (let i = 48; i <= 57; i++) {
    numChars.push(String.fromCharCode(i));
  }

  // Special Character Arr
  const specialChars = [];
  for (let i = 32; i <= 126; i++) {
    if (
      (i >= 32 && i <= 47) ||
      (i >= 58 && i <= 64) ||
      (i >= 91 && i <= 96) ||
      (i >= 123 && i <= 126)
    ) {
      specialChars.push(String.fromCharCode(i));
    }
  }
  console.log(specialChars);

  //<----------------------use state---------------------------->
  const [selectedValues, setSelectedValues] = useState([]);
  const [userInputLength, setUserInputLength] = useState(8);
  const [generatedPassword, setGeneratedPassword] = useState("");

  // <-------------------Handle checked value from checkbox------------------------------------>
  let handleChange = (e) => {
    // extracting value and checked property
    const { value, checked } = e.target;

    // aaray of array for all character
    let valArr = {
      uppeerCaseChars: uppeerCaseChars,
      lowerCaseChars: lowerCaseChars,
      numChars: numChars,
      specialChars: specialChars,
    };
    console.log(valArr);
    // <-------------set selectd value---------------------------------------------->
    setSelectedValues((preSelectedValues) => {
      // new selected value
      const newSelectedValue = [...preSelectedValues];

      for (const key in valArr) {
        if (value == key) {
          if (checked) {
            newSelectedValue.push(...valArr[key]);
          } else {
            valArr[key].forEach((char) => {
              let index = newSelectedValue.indexOf(char);
              if (index != -1) {
                newSelectedValue.splice(index, 1);
              }
            });
          }
        }
      }
      //   console.log(newSelectedValue);
      return newSelectedValue;
    });
  };

  //<-------------password length input taken from user-------------------------------------->
  const userInputLengthFn = (e) => {
    setUserInputLength(e.target.value);
  };

  //<-------------creating random Password on click generate button-------------------------------->
  const onClickGeneratePassowrd = () => {
    let newGeneratePassword = "";

    // no value checked
    if (selectedValues.length == 0) {
      alert("--All checks are empty--");
      return;
    }
    // condition for length of password
    if (userInputLength >= 8 && userInputLength <= 50) {
      for (let i = 0; i < userInputLength; i++) {
        let randomIndex = Math.floor(Math.random() * selectedValues.length);
        newGeneratePassword += selectedValues[randomIndex];
      }
      setGeneratedPassword(newGeneratePassword);
    } else {
      alert("Password length is out of range");
    }
  };

  //<------------------------------copy password--------------------------------------->
  const [textToCopy, setTextToCopy] = useState("hello");

  useEffect(() => {
    setTextToCopy(generatedPassword);
  }, [generatedPassword]);

  let copyToClipboard = () => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        alert(`Password copied : ${generatedPassword}`);
      })
      .catch((error) => {
        console.error("Error copying text:", error);
      });
  };

  // <-------------------------Main code--------------------------------------------->
  return (
    <div className="password-generator">
      {/* heading */}
      <header className="password-header">
        <h1>Password Generator</h1>
      </header>

      {/* password div and copy button */}
      <div className="password-container">
        <textarea
          className="password-input"
          onChange={(e) => setTextToCopy(e.target.value)}
          value={generatedPassword}
          readOnly
        >
          {generatedPassword}
        </textarea>
        <button onClick={copyToClipboard} className="copy-button">
          <i className="material-icons">content_copy</i>
        </button>
      </div>

      {/* password length and take length form input */}
      <div className="password-options">
        <div className="length-selection">
          <p>Select Password length(**8-50 characters**) : </p>
          <input
            type="number"
            onChange={userInputLengthFn}
            value={userInputLength}
          />
        </div>
      </div>

      {/* chekbox for charater */}
      <div className="character-options">
        <div className="option">
          <input
            type="checkbox"
            onChange={handleChange}
            value="uppeerCaseChars"
          />
          <span>Include upper case</span>
        </div>
        <div className="option">
          <input
            type="checkbox"
            onChange={handleChange}
            value="lowerCaseChars"
          />
          <span>Include lower case</span>
        </div>
        <div className="option">
          <input type="checkbox" onChange={handleChange} value="numChars" />
          <span>Include numbers</span>
        </div>
        <div className="option">
          <input type="checkbox" onChange={handleChange} value="specialChars" />
          <span>Include symbols</span>
        </div>
      </div>

      {/* Generate Button */}
      <button onClick={onClickGeneratePassowrd} className="generate-button">
        Generate Password
      </button>
    </div>
  );
};

export default Main;
