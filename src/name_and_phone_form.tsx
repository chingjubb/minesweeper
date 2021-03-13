import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { NextStepButton, FinishButton } from './add_user_button';
import QRCode from "react-qr-code";

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
	return (<div style={{ fontSize: 20, margin: 'auto', marginBottom: 20 }}>
				線上點燈系統
			</div>)

}

export const PhoneForm = (props: PhoneProps) => {
	const [phoneNumber, setPhoneNumber] = useState('');
	const { onPhoneNumberChange } = props;
	return (<div style={{ margin: 'auto', width: 400, marginTop: 80}}>
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

export const NameForm = (props: NameProps) => {
	const [userName, setUserName] = useState('');
	const { onUserNameChange } = props;
	return (<div style={{ margin: 'auto', width: 400, marginTop: 80}}>
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
	return (<div style={{ margin: 'auto', width: 500, marginTop: 100, }}>
				<div style={{ marginBottom: 20, fontSize: 20,fontWeight: 600 }}>
					燈單建立成功！ 序號：{confirmationNumber}
				</div>
				<div>直接前往：<a href={onlinePayUrl}>{onlinePayUrl}</a></div>
				<div>或掃描QR CODE：</div>
				<div style={{marginTop: 20}}><QRCode value={onlinePayUrl} /></div>
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
