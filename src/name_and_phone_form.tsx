import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { NextStepButton, FinishButton, GoToHomePage } from './add_user_button';
import QRCode from "react-qr-code";
import logo from './logo.png';


type Props = {
	onUserNameChange: (userName: string) => void;
	onPhoneNumberChange: (phoneNumber: string) => void;
};

type PhoneProps = {
	onPhoneNumberChange: (phoneNumber: string) => void;
};

type NameProps = {
	onUserNameChange: (userName: string) => void;
};

export const LogoTitle = () => {
	return (<div style={{ fontSize: 20, marginBottom: 20, textAlign:'center', width: 300 }}>
				<div><img src={logo} alt='logl' style={{ width: 100 }}/></div>
				<div>線上點燈系統</div>
			</div>)

}

export const PhoneForm = (props: PhoneProps) => {
	const [phoneNumber, setPhoneNumber] = useState('');
	const { onPhoneNumberChange } = props;
	return (<div style={{ margin: 'auto', width: 400, marginTop: 60}}>
				<LogoTitle />
				<div>
					<TextField
						style={{ width: 300, margin: 5 }}
						label={'請輸入電話號碼'}
						variant="outlined"
						required
						value={phoneNumber}
						placeholder="請輸入電話號碼"
						onChange={(e) => { setPhoneNumber(e.target.value) }}
					/>
				</div>
				<NextStepButton onClick={() => {
									onPhoneNumberChange(phoneNumber);
								}}
								disabled={phoneNumber.length === 0} />
			</div>);
};


type FindMemberProps = {
	onClick: (userName: string) => void;
};
export const FindMemberForm = (props: FindMemberProps) => {
	const [userName, setUserName] = useState('');
	const { onClick } = props;
	return (<div style={{ margin: 'auto', width: 400, marginTop: 60}}>
				<div style={{ width: 300, textAlign: 'center', marginBottom: 20}}>OR</div>
				<div>
					<TextField
						required
						style={{ width: 300, margin: 5 }}
						label={'請輸入會員關鍵字'}
						variant="outlined"
						value={userName}
						placeholder="請輸入會員關鍵字"
						onChange={(e) => {
							setUserName(e.target.value);
						}}
					/>
				</div>
				<NextStepButton onClick={() => {
									onClick(userName);
								}}
								disabled={userName.length === 0} />
			</div>);
};

export const NameForm = (props: NameProps) => {
	const [userName, setUserName] = useState('');
	const { onUserNameChange } = props;
	return (<div style={{ margin: 'auto', width: 400, marginTop: 60}}>
				<LogoTitle />
				<div>
					<TextField
						required
						style={{ width: 300, margin: 5 }}
						label={'姓名'}
						variant="outlined"
						autoFocus
						value={userName}
						placeholder="請輸入姓名"
						onChange={(e) => { setUserName(e.target.value )}}
					/>
				</div>
				<NextStepButton onClick={() => {
									onUserNameChange(userName);
								}}
								disabled={userName.length === 0} />
			</div>);
};

export const SuccessPagePayAtCounter = ({ confirmationNumber }: { confirmationNumber: string }) => {
	return (<div style={{ margin: 'auto', width: 400, marginTop: 100, fontSize: 25,fontWeight: 600 }}>
				<div style={{ marginBottom: 100 }}>
					燈單建立成功！請前往櫃檯結帳。
					序號：{confirmationNumber}
				</div>
				<div style={{ display: 'flex', justifyContent: 'center' }}>
					<FinishButton onClick={() => {
									window.location.reload();
							  }}/>
				</div>
			</div>);
};

export const SuccessPagePayOnline = ({ confirmationNumber, onlinePayUrl }:
	{ confirmationNumber: string; onlinePayUrl: string; }) => {
	return (<div style={{ margin: 'auto', width: 500, marginTop: 60, textAlign: 'center'}}>
				<div style={{ marginBottom: 20, fontSize: 20,fontWeight: 600 }}>
					燈單建立成功！ 序號：{confirmationNumber}
				</div>
				<div>直接前往：<a href={onlinePayUrl} target="_blank">{onlinePayUrl}</a></div>
				<br/>
				<div>或掃描QR CODE：</div>
				<div style={{marginTop: 20, marginBottom: 50}}><QRCode value={onlinePayUrl} /></div>
				<GoToHomePage onClick={() => { window.location.reload(); }}/>
			</div>);
};

export const NameAndPhoneForm = (props: Props) => {
	const [userName, setUserName] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const { onUserNameChange, onPhoneNumberChange } = props;

	return (<div style={{ margin: 'auto', width: 400, marginTop: 100}}>
				<div>
					<TextField
						required
						style={{ width: 300, margin: 5 }}
						label={'姓名'}
						variant="outlined"
						autoFocus
						value={userName}
						placeholder="請輸入姓名"
						onChange={(e) => { setUserName(e.target.value )}}
					/>
				</div>
				<div>
					<TextField
						style={{ width: 300, margin: 5 }}
						label={'聯絡電話'}
						variant="outlined"
						required
						value={phoneNumber}
						placeholder="請輸入電話"
						onChange={(e) => { setPhoneNumber(e.target.value) }}
					/>
				</div>
				<NextStepButton onClick={() => {
									onUserNameChange(userName);
									onPhoneNumberChange(phoneNumber);
								}}
								disabled={phoneNumber.length === 0 || userName.length === 0} />
			</div>);
};
