import React, { useState, Dispatch } from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { ActionTypes, LightAction, User, Light, Location, YearLight } from './light_reducer';
import { ColorButton } from './add_user_button';
import { AddAndSelectUserModal } from './add_and_select_user_modal';

type Props = {
	allUsers: User[];
	yearLights: YearLight[],
	dispatch: Dispatch<LightAction>;
	allLights: Light[];
	location: Location;
}

export const YearLightTable = (props: Props) => {
	const { yearLights, allUsers, allLights, location, dispatch } = props;

	const deleteLightAtIndex = (index: number) => {
		dispatch({ type: ActionTypes.deleteYearLightAt, index });
	}

	const onSubmitYearLightUsersAt = (users: User[], index: number) => {
		const userNames: string[] = users.map((u: User) => u.name);
	 	dispatch({ type: ActionTypes.loadUsers, users });
	 	dispatch({ type: ActionTypes.setYearLightUsersAt,
	 			   index,
	 			   userNames,
	 	});
	}

	return (
		<div style={{ width: 1000 }}>
			<TableContainer component={Paper} style={{ width: 1000 }}>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow style={{ backgroundColor: '#D8AA56' }}>
							<TableCell>操作</TableCell>
							<TableCell>年度燈</TableCell>
							<TableCell>每盞</TableCell>
							<TableCell>點燈人</TableCell>
							<TableCell>點燈地點</TableCell>
							<TableCell>備註</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{yearLights.map((yearLight: YearLight, index: number) => {
							return (<Row yearLight={yearLight}
										 key={'YearLight' + yearLight.lightName + index}
										 allLights={allLights}
										 allUsers={allUsers}
										 onDelete={() => {
										 	deleteLightAtIndex(index);
										 }}
										 onSubmit={(users: User[]) => {
											onSubmitYearLightUsersAt(users, index);
										 }}
										 location={location} />);
						})}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
  );
};

type RowProps = {
	yearLight: YearLight;
	allLights: Light[];
	allUsers: User[];
	location: Location;
	onDelete: () => void;
	onSubmit: (users: User[]) => void;
};

const Row = (props: RowProps) => {
	const { allLights, location, yearLight, onDelete, onSubmit } = props;
	const [showModal, setShowModal] = useState(false);
	const theLight: Light = allLights.find((light: Light) => light.name === yearLight.lightName );
	if (!theLight) {
		return;
	}

	return <TableRow>
				<AddAndSelectUserModal open={showModal}
									   onSubmit={onSubmit}
									   onClose={()=>{ setShowModal(false) }} />
				<TableCell style={{width: 230}}>
					<ColorButton variant="contained"
								 style={{width:'120px', marginRight:'10px'}}
								 onClick={() => { setShowModal(true) }}
								 color="primary">編輯點燈人</ColorButton>
					<Button variant="contained"
							onClick={onDelete}
							style={{width:'60px'}}>刪除</Button>
				</TableCell>
				<TableCell style={{width: 200}}>{yearLight.lightName}</TableCell>
				<TableCell>{theLight.price}</TableCell>
				<TableCell>
					{yearLight.userNames.map((userName: string, index: number) => {
						return <div key={userName + index}>{userName},</div>
					})}
				</TableCell>
				<TableCell>{location?.name}</TableCell>
				<TableCell></TableCell>
			</TableRow>
};
