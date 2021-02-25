import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { NextStepButton } from './add_user_button';

type Props = {
	onUserNameChange: (userName: string) => void;
	onPhoneNumberChange: (phoneNumber: string) => void;
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
