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
import { SubmitLightToCounterButton, SubmitLightPayOnlineButton, GoToHomePage, ColorButton } from './add_user_button';
import Checkbox from '@material-ui/core/Checkbox';
import NumberFormat from 'react-number-format';

type Props = {
	allUsers: User[];
	users: Map<string, LightCountMap>;
	dispatch: Dispatch<LightAction>;
	allLights: Light[];
	location?: Location;
	onSubmitPayAtCounter: () => void;
	onSubmitPayOnline: () => void;
	L108: boolean;
	Lking: boolean;
	family: boolean;
	isLoadingPayAtCounter?: boolean;
	isLoadingPayOnline?: boolean;
}

export const CeremonyLightTable = (props: Props) => {
	const { users,
			allUsers,
			dispatch,
			allLights,
			location,
			onSubmitPayAtCounter,
			onSubmitPayOnline,
			isLoadingPayAtCounter,
			isLoadingPayOnline,
			L108, Lking, family } = props;

	let total = 0;
	const userNames = Object.keys(users);
	userNames.forEach((userName: string) => {
		const lightCountMap: LightCountMap | undefined = users[userName];
		if (lightCountMap) {
			const subtotal = getSubTotal(lightCountMap, allLights);
			total += subtotal;
		}
	});
	const showFamilyCheckbox = L108 || Lking;
	if (L108) {
		total = 200 * 108;
	} else if (Lking) {
		total = 200 * 108 * 12;
	}
	return (
		<div style={{ width: 1100 }}>
			<div style={{ textAlign: 'right' }}>
				<Checkbox
					checked={L108}
					onChange={() => {
						dispatch({ type: 'setL108', L108: !L108 });
					}}
					color="default"
				/>
				全體點108燈
				<Checkbox
					checked={Lking}
					onChange={() => {
						dispatch({ type: 'setLking', Lking: !Lking });
					}}
					color="default"
				/>
				全體點燈王
				<span style={{ opacity: showFamilyCheckbox ? 100 : 0 }}>
					<Checkbox
						checked={family}
						onChange={() => {
							dispatch({ type: 'setFamily', family: !family });
						}}
						color="default"
						disabled={!showFamilyCheckbox}
					/>
					顯示闔府
				</span>
			</div>
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
											L108={L108}
											Lking={Lking}
										    lightCountMap={lightCountMap} />;
							}
						)}
					</TableBody>
				</Table>
			</TableContainer>
			{total > 0 && <div style={{marginTop: 20}}>總價： <NumberFormat value={total} displayType={'text'} thousandSeparator={true} />元</div>}
			<div style={{marginTop: 20}}>
				<SubmitLightToCounterButton
					disabled={total <= 0 || isLoadingPayAtCounter}
					buttonLabel={isLoadingPayAtCounter ? '載入中...' : undefined}
					onClick={onSubmitPayAtCounter} />
				<SubmitLightPayOnlineButton
					disabled={total <= 0 || isLoadingPayOnline}
					buttonLabel={isLoadingPayOnline ? '載入中...' : undefined}
					onClick={onSubmitPayOnline} />
				<GoToHomePage
					onClick={() => { window.location.reload(); }}/>
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
	L108?: boolean;
	Lking?: boolean;
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
	const { user, lightCountMap, dispatch, allLights, location, L108, Lking } = props;
	const [showModal, setShowModal] = useState(false);
	const lightNames: string[] = Object.keys(lightCountMap);
	const subtotal = getSubTotal(lightCountMap, allLights);

	const onSubmit = (lightCountMap: LightCountMap) => {
		dispatch({type: ActionTypes.updateLightCountMapForUser,
				  userName : user.name, 
				  lightCountMap: lightCountMap});
		setShowModal(false);
	};

	const subtotalString = L108 || Lking ? '--' : <NumberFormat value={subtotal} displayType={'text'} thousandSeparator={true} />;

	return <TableRow>
				<SelectLightModal open={showModal}
								  lightCountMap={lightCountMap}
								  onSubmit={onSubmit}
								  showCheckBox
								  onClose={() => { setShowModal(false) }}
								  allLights={allLights} />
				<TableCell>
					<div style={{ minWidth: 150 }}>
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
					</div>
				</TableCell>
				<TableCell>
					<div style={{ minWidth: 30, maxWidth: 60 }}>
						{user.name}
					</div>
				</TableCell>
				<TableCell>
					<div style={{ minWidth: 110 }}>
						{userBirthdayString(user)}
					</div>
				</TableCell>
				<TableCell>
					<div style={{ minWidth: 150 }}>
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
					</div>
				</TableCell>
				<TableCell>
					<div style={{ minWidth: 40 }}>
						{subtotalString}
					</div>
				</TableCell>
				<TableCell>
					<div style={{ minWidth: 100 }}>
						{location?.name}
					</div>
				</TableCell>
				<TableCell>
					<div style={{ maxWidth: 200 }}>
						{user.comment}
					</div>
				</TableCell>
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

