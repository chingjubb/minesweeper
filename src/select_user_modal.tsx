import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from '@material-ui/core/Checkbox';
import { User } from './light_reducer';
import { userBirthdayString } from './ceremony_light_table';

type Props = {
	onClose: () => void;
	open: boolean;
	allUsers: User[];
	selectedNames: string[];
	onSubmit: (selectedNames: string[]) => void;
}

export const SelectUserModal = (props: Props) => {
	const { onClose, open, allUsers, selectedNames, onSubmit} = props;
	const [selectedNameState, setSelectedNameState] = useState<string[]>(selectedNames);
	console.log('selectedNames', selectedNames);

	const addSelectedName = (name: string) => {
		if (!selectedNameState.includes(name)) {
			const newSelectedNameState = [...selectedNameState];
			newSelectedNameState.push(name);
			setSelectedNameState(newSelectedNameState);
		}
	}

	const removeSelectedName = (name: string) => {
		const newSelectedNameState = selectedNameState.filter((n) => n !== name);
		setSelectedNameState(newSelectedNameState);
	}

	const onClick = () => {
		onSubmit(selectedNameState);
		onClose();
	}

	const onCancel = () => {
		setSelectedNameState(selectedNames);
		onClose();
	}

	return (
		<Dialog onClose={onCancel}
				aria-labelledby="simple-dialog-title"
				open={open}
				maxWidth="md"
				fullWidth={false}>
			<DialogTitle>選取點燈人</DialogTitle>
			<div style={{ height: 600, margin:'20px' }}>
				<TableContainer component={Paper} style={{width:'800px', marginBottom:'20px'}}>
					<Table aria-label="simple table">
						<TableHead>
							<TableRow style={{ backgroundColor: '#D8AA56' }}>
								<TableCell></TableCell>
								<TableCell>姓名</TableCell>
								<TableCell>生日</TableCell>
								<TableCell>地址</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{allUsers.map((user: User) => {
								const checked = selectedNameState.includes(user.name);
								return <TableRow key={user.name + checked.toString()}>
											<TableCell style={{width:'50px'}}>
												<Checkbox
													checked={checked}
													onChange={()=>{
														if (checked) {
															removeSelectedName(user.name);
														} else {
															addSelectedName(user.name);
														}
													}}
													color="default"
												/>
											</TableCell>
											<TableCell>
												{user.name}
											</TableCell>
											<TableCell>{userBirthdayString(user)}</TableCell>
											<TableCell>{user.address}</TableCell>
										</TableRow>
							})}
						</TableBody>
					</Table>
				</TableContainer>
				<Button variant="contained"
						color="primary"
						onClick={onClick}
						style={{width:'150px', marginRight:'20px'}}>確定</Button>
				<Button variant="contained"
						onClick={onCancel}
						style={{width:'150px'}}>取消</Button>
			</div>
		</Dialog>
  );
};
