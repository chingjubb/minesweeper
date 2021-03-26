import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import { Light, LightCountMap } from './light_reducer';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import Checkbox from '@material-ui/core/Checkbox';

type Props = {
	onClose: () => void;
	open: boolean;
	allLights: Light[];
	lightCountMap: LightCountMap;
	onSubmit: (lightCountMap: LightCountMap) => void;
	showCheckBox: boolean;
}

export const SelectLightModal = (props: Props) => {
	const { onClose, open, allLights, lightCountMap, onSubmit, showCheckBox } = props;
	const [lightCountMapState, setLightCountMapState] = useState<LightCountMap>(lightCountMap);

	const updateCountMap = (lightName: string, count: number) => {
		const newLightCountMapState = {...lightCountMapState};
		newLightCountMapState[lightName] = count;
		setLightCountMapState(newLightCountMapState);
	}

	const onClick = () => {
		onSubmit(lightCountMapState);
		onClose();
	}

	const onCancel = () => {
		const newLightCountMapState = {...lightCountMap};
		setLightCountMapState(newLightCountMapState);
		onClose();
	}

	const isOneForEachLight = (): boolean => {
		// Does user select 1 for each light?
		let returnValue = true;
		const lightNames = Object.keys(lightCountMapState);
		if (lightNames.length !== allLights.length) {
			returnValue = false;
		}
		lightNames.forEach((lightName: string) => {
			if (lightCountMapState[lightName] !== 1) {
				returnValue = false;
			}
		})
		return returnValue;
	}

	const setOneForEachLight = () => {
		const newLightCountMapState: LightCountMap = {} as LightCountMap;
		allLights.forEach((light: Light) => {
			newLightCountMapState[light.name] = 1;
		});
		setLightCountMapState(newLightCountMapState);
	}

	const checked = isOneForEachLight();

	return (
		<Dialog onClose={()=>{}}
				aria-labelledby="simple-dialog-title"
				open={open}
				maxWidth="md"
				fullWidth={false}>
			<div style={{ height: 600, width: 800, margin: 30 }}>
				{showCheckBox &&
					<div>
						<Checkbox
							checked={checked}
							onChange={() => {
								if (!checked) {
									setOneForEachLight();
								}
							}}
							color="default"
						/>
						每燈陣各1燈
					</div>}
				<TableContainer component={Paper} style={{marginBottom: 20}}>
					<Table aria-label="simple table">
						<TableHead>
							<TableRow style={{ backgroundColor: '#D8AA56' }}>
								<TableCell>點燈數量</TableCell>
								<TableCell>燈陣資訊</TableCell>
								<TableCell>意境</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{allLights.map((light: Light) => {
								const count = lightCountMapState[light.name] ?? 0;
								return <LightRow light={light}
												 onChange={(count: number) => {
												 	updateCountMap(light.name, count);
												 }}
												 key={light.name}
												 count={count} />
							})}
						</TableBody>
					</Table>
				</TableContainer>
				<div style={{paddingBottom: 20}}>
					<Button variant="contained"
							color="primary"
							onClick={onClick}
							style={{width:'150px', marginRight:'20px'}}>確定</Button>
					<Button variant="contained"
							style={{width:'150px'}}
							onClick={onCancel}>取消</Button>
				</div>
			</div>
		</Dialog>
  );
};

type LightRowProps = {
	light: Light;
	count: number;
	onChange: (count: number) => void;
};
const LightRow = (props: LightRowProps) => {
	const { light, count, onChange } = props;
	return <TableRow key={light.name}>
				<TableCell style={{width: 100, maxWidth: 160}}>
					<div style={{display:'flex', justifyContent:'center', justifyItems:'center', width: 100, maxWidth: 160}}>
						<div onClick={()=>{
							 	if (count - 1 >= 0) {
							 		onChange(count - 1);
							 	}
							 }}
							 style={{display: 'flex',
							 		justifyContent: 'center',
							 		alignItems: 'center',
							 		height: 40,
									maxHeight: 40,
									cursor: 'pointer'}}>
							<RemoveCircleOutlineIcon />
					 	</div>
						<TextField style={{paddingLeft: 5, paddingRight: 5, minWidth: 40, maxWidth: 60 }}
							label={''}
							value={count} variant='outlined'
							onChange={(e) => {
								const number = parseInt(e.target.value);
								if (isNaN(number) || number < 0) {
									onChange(0);
								} else {
									onChange(number);
								}
							}}
							size='small'
						/>
						<div onClick={() => {
								onChange(count + 1);
							 }} 
							 style={{display: 'flex',
							 		justifyContent: 'center',
							 		alignItems: 'center',
									height: 40,
									maxHeight: 40,
									cursor: 'pointer'}}>
							<AddCircleOutlineIcon />
						</div>
					</div>
				</TableCell>
				<TableCell style={{width: 220}}>
					{light.series} {light.name}<br/>
					<span style={{color: 'gray'}}>{'('}{light.functional}{')'}</span><br/>
					{light.price} 元
				</TableCell>
				<TableCell>{light.content}</TableCell>
			</TableRow>
};
