import React, { useState } from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import { baseURL } from '../config';

export default function Join() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [isEmailChecked, setisEmailChecked] = useState('yet');
  const [isPasswordSame, setisPasswordSame] = useState(false);
  const [joinResult, setJoinResult] = useState(false);
  const checkEmail = async () => {
    const { data } = await Axios.get(`${baseURL}/auth/email?email=${email}`);
    setisEmailChecked(data.result);
  };
  return (
    <>
      <form>
        <div className="form-group">
          <label>별명</label>
          <input
            type="text"
            className="form-control"
            placeholder="블로그에서 사용할 이름"
          />
          <div className="form-group">
            <label>이메일 주소</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => {
                setisEmailChecked('yet');
                setEmail(e.target.value);
              }}
            />
            <button
              type="button"
              className="btn btn-secondary"
              onClick={checkEmail}
            >
              이메일 중복 체크
            </button>
            <small>
              {isEmailChecked === 'yet'
                ? '중복체크를 해주세요'
                : isEmailChecked
                  ? '이 이메일은 사용할수있습니다.'
                  : '사용하실수없습니다.'}
            </small>
          </div>
          <div className="form-group">
            <label>비밀번호</label>
            <input
              type="password"
              className="form-control"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setisPasswordSame(e.target.value === password2);
              }}
            />
          </div>
          <div className="form-group">
            <label>비밀번호 확인</label>
            <input
              type="password"
              className="form-control"
              placeholder="비밀번호 확인"
              value={password2}
              onChange={(e) => {
                setPassword2(e.target.value);
                setisPasswordSame(e.target.value === password);
              }}
            />
          </div>
          <small>
            {isPasswordSame ? '비밀번호 일치' : '비밀번호가 다릅니다!'}
          </small>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
