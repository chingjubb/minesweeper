import React, { useState, Dispatch } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { ActionTypes, LightAction, User } from './light_reducer';
import { v4 as uuidv4 } from 'uuid';

type Props = {
	onClose: () => void;
	open: boolean;
	dispatch: Dispatch<LightAction>;
};

export const NewUserModal = (props: Props) => {
	const { onClose, open, dispatch } = props;
	const [name, setName] = useState("");
	const [yearType, setYearType] = useState("國曆");
	const [year, setYear] = useState("");
	const [month, setMonth] = useState("");
	const [day, setDay] = useState("");
	const [address, setAddress] = useState("");
	const [comment, setComment] = useState("");
	
	const onSubmit = () => {
		const user: User = {
			name,
			birth_cal: yearType === "國曆" ? 1 : 0,
			birth_year: !isNaN(parseInt(year)) ? parseInt(year) : 0,
			birth_month: !isNaN(parseInt(month)) ? parseInt(month) : 0,
			birth_day: !isNaN(parseInt(day)) ? parseInt(day) : 0,
			address,
			comment,
			id: uuidv4(),
		};
		dispatch({type: ActionTypes.addNewUser, user: user});
		onClose();
	};

	return (
		<Dialog onClose={()=>{}}
				aria-labelledby="simple-dialog-title"
				open={open}
				maxWidth="md"
				fullWidth={false}
				>
			<form autoComplete="on"
				  style={{maxWidth:800, paddingLeft:30, paddingRight:30, paddingBottom:30, paddingTop: 10}}>
				<DialogTitle>新增點燈人</DialogTitle>
				<div>
					<TextField required
						style={{width: 320, margin: "5px"}}
						label={'姓名'} variant="outlined"
						autoFocus
						value={name} placeholder="請輸入點燈者姓名"
						onChange={(e) => { setName(e.target.value); }}
					/>
				</div>
				<div>
					<TextField
						style={{width: 155, margin: "5px"}}
						label={'曆別'} variant="outlined"
						value={yearType} placeholder="國曆"
						onChange={(e) => { setYearType(e.target.value); }}
					/>
					<TextField
						style={{width: 155, margin: "5px"}}
						label={'生年'} variant="outlined"
						value={year} placeholder="（西元/民國）吉"
						error={Number.isInteger(parseInt(year)) && parseInt(year) <= 0}
						onChange={(e) => { setYear(e.target.value); }}
					/>
					<TextField
						style={{width: 155, margin: "5px"}}
						label={'生月'} variant="outlined"
						value={month} placeholder="吉"
						error={Number.isInteger(parseInt(month)) && (parseInt(month) <= 0 || parseInt(month) > 12) }
						onChange={(e) => { setMonth(e.target.value); }}
					/>
					<TextField
						style={{width: 155, margin: "5px"}}
						label={'生日'} variant="outlined"
						value={day} placeholder="吉"
						error={Number.isInteger(parseInt(day)) && (parseInt(day) <= 0 || parseInt(day) > 31)}
						onChange={(e) => { setDay(e.target.value); }}
					/>
				</div>
				<div>
					<TextField
						style={{width: "650px", margin: "5px"}}
						placeholder={'請填入點燈者地址，空白為「吉」'}
						label="地址" variant="outlined" value={address}
						onChange={(e) => { setAddress(e.target.value); }}
					/>
				</div>
				<div>
					<TextField
						style={{width: "650px", margin: "5px"}}
						label="備註" variant="outlined" value={comment}
						onChange={(e) => { setComment(e.target.value); }}
					/>
				</div>
				<div style={{margin:5, marginTop: 20}}>
					<Button variant="contained"
						color="primary"
						disabled={name.trim().length === 0}
						onClick={onSubmit}
						style={{width:'150px', marginRight:'20px'}}>加入點燈人</Button>
					<Button variant="contained"
						onClick={onClose}
						style={{width:'150px'}}>取消</Button>
				</div>
			</form>
		</Dialog>
  );
};
