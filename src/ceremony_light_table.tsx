import React, { useState, Dispatch } from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { ActionTypes, LightAction, User, Light, LightCountMap, Location } from './light_reducer';
import { SelectLightModal } from './select_light_modal';
import { SubmitLightButton, GoBackToSelectPage, ColorButton } from './add_user_button';

type Props = {
	allUsers: User[];
	users: Map<string, LightCountMap>;
	dispatch: Dispatch<LightAction>;
	allLights: Light[];
	location?: Location;
	onSubmit: () => void;
}

export const CeremonyLightTable = (props: Props) => {
	const { users, allUsers, dispatch, allLights, location, onSubmit } = props;

	let total = 0;
	const userNames = Object.keys(users);
	userNames.forEach((userName: string) => {
		const lightCountMap: LightCountMap | undefined = users[userName];
		if (lightCountMap) {
			const subtotal = getSubTotal(lightCountMap, allLights);
			total += subtotal;
		}
	});

	return (
		<div style={{ width: 1100 }}>
			<TableContainer component={Paper} style={{ width: 1100 }}>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow style={{ backgroundColor: '#D8AA56' }}>
							<TableCell>操作</TableCell>
							<TableCell>點燈者</TableCell>
							<TableCell>生日</TableCell>
							<TableCell>燈祿項目</TableCell>
							<TableCell>小計</TableCell>
							<TableCell>點燈地點</TableCell>
							<TableCell>備註</TableCell>
							<TableCell>地址</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{Object.entries(users).map(([name, lightCountMap]) => {
								const user = allUsers.find((u: User) => u.name === name);
								if (!user) {
									return;
								}
								return <Row user={user}
											key={name}
											allLights={allLights}
											dispatch={dispatch}
											location={location}
										    lightCountMap={lightCountMap} />;
							}
						)}
					</TableBody>
				</Table>
			</TableContainer>
			{total > 0 && <div style={{marginTop: 20}}>總價： {total}元</div>}
			<div style={{marginTop: 20}}>
				<SubmitLightButton disabled={total <= 0} onClick={onSubmit}/>
				<GoBackToSelectPage onClick={() => { window.location.reload(); }}/>
			</div>
		</div>
  );
};

type RowProps = {
	user: User;
	lightCountMap: LightCountMap;
	dispatch: Dispatch<LightAction>;
	allLights: Light[];
	location?: Location;
};

const getSubTotal = (lightCountMap: LightCountMap, allLights: Light[]): number => {
	const lightNames: string[] = Object.keys(lightCountMap);
	let subtotal = 0;
	lightNames.forEach((lightName: string) => {
		const theLight: Light | undefined = allLights.find((light: Light) => light.name === lightName);
		if (theLight) {
			const count = lightCountMap[lightName] ?? 0;
			subtotal += count * theLight.price;
		}
	});
	return subtotal;
}

const Row = (props: RowProps) => {
	const { user, lightCountMap, dispatch, allLights, location } = props;
	console.log('row user', user);
	console.log('row lightCountMap', lightCountMap);
	const [showModal, setShowModal] = useState(false);
	const lightNames: string[] = Object.keys(lightCountMap);
	const subtotal = getSubTotal(lightCountMap, allLights);

	const onSubmit = (lightCountMap: LightCountMap) => {
		dispatch({type: ActionTypes.updateLightCountMapForUser,
				  userName : user.name, 
				  lightCountMap: lightCountMap});
		setShowModal(false);
	};

	return <TableRow>
				<SelectLightModal open={showModal}
								  lightCountMap={lightCountMap}
								  onSubmit={onSubmit}
								  onClose={() => { setShowModal(false) }}
								  allLights={allLights} />
				<TableCell>
					<ColorButton variant="contained"
							color="primary"
							onClick={() => { setShowModal(true) }}
							style={{width:'60px', marginRight:'10px'}}>編輯</ColorButton>
					<Button variant="contained"
							onClick={() => {
								dispatch({ type: ActionTypes.removeUserFromLight,
										   userName: user.name });
							}}
							style={{width:'60px'}}>刪除</Button>
				</TableCell>
				<TableCell>{user.name}</TableCell>
				<TableCell>{userBirthdayString(user)}</TableCell>
				<TableCell>
					{lightNames.map((lightName: string) => {
						const theLight = allLights.find((light: Light) => light.name === lightName);
						if (!theLight) {
							return null;
						}
						const count = lightCountMap[lightName] ?? 0;
						if (count > 0) {
							return <div key={lightName}>{'('}{theLight.series}{')'} {lightName} X{count},</div>
						} else {
							return null;
						}
					})}	
				</TableCell>
				<TableCell>{subtotal === 0 ? '' : subtotal}</TableCell>
				<TableCell>{subtotal === 0 ? '' : location?.name}</TableCell>
				<TableCell>{user.comment}</TableCell>
				<TableCell>{user.address}</TableCell>
			</TableRow>
};

export const userBirthdayString = (user: User) => {
	const birthCal: string = user.birth_cal?.toString() === '1' ? '(國)' : '(農)';
	const birth_year: string | number = user.birth_year;
	const birth_month: string | number  = user.birth_month;
	const birth_day: string | number  = user.birth_day;

	return (<span>
				<span>{ birthCal }</span>
				<span>{ birth_year === 0 ? '吉' : birth_year }年</span>
				<span>{ birth_month === 0 ? '吉' : birth_month }月</span>
				<span>{ birth_day === 0 ? '吉' : birth_day }日</span>
			</span>);
};

