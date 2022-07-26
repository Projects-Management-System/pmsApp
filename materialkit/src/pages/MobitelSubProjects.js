import react, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
import graph from '@iconify/icons-eva/activity-fill';
// material
import { Grid, Button, Link, Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
//
import {
  AppNewsUpdate,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppWebsiteVisits1,
  AppNewUsers,
  AppBugReports,
  AppBugReports1,
  AppItemOrders,
  AppWeeklySales
} from '../components/_dashboard/MobitelSubProjects';

import AppCurrentVisits0 from '../components/_dashboard/MobitelSubProjects/New folder/AppCurrentVisits0';
import AppCurrentVisits1 from '../components/_dashboard/MobitelSubProjects/New folder/AppCurrentVisits1';
import AppCurrentVisits2 from '../components/_dashboard/MobitelSubProjects/New folder/AppCurrentVisits2';
import AppCurrentVisits3 from '../components/_dashboard/MobitelSubProjects/New folder/AppCurrentVisits3';
import AppCurrentVisits4 from '../components/_dashboard/MobitelSubProjects/New folder/AppCurrentVisits4';
import AppCurrentVisits5 from '../components/_dashboard/MobitelSubProjects/New folder/AppCurrentVisits5';
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
// -----------------------------------------------------------------------------------------------------------

export default function MobitelSubProjects() {
  const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_API_URL });

  const [specialTag, setSpecialTag] = useState([]);
  const [projectNamesArray, setprojectNamesArray] = useState([]);
  const [WidthdrawnDataforSquares, setWidthdrawnDataforSquares] = useState([]);

  const [ScopeData, setScopeData] = useState([]);
  const [HandoverData, setHandoverData] = useState([]);
  const [PATPassData, sePATPassData] = useState();
  const [OnAirData, setOnAirData] = useState();
  const [HoldSitesData, setHoldSitesData] = useState();
  const [ChartDatForColumnGraph, setChartDatForColumnGraph] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]);
  const [XaxisData, setXaxisData] = useState([]);
  const [ProjectCompletion, setProjectCompletion] = useState([0, 0, 0]);
  const [SitesOnAir, setSitesOnAir] = useState([0, 0, 0]);
  const [PatCompletionData, setPatCompletionData] = useState([0, 0, 0, 0, 0]);
  const [SARData, setSARData] = useState([0, 0, 0, 0, 0]);
  const [CommissioningData, setCommissioningData] = useState([0, 0, 0]);
  const [InstallationData, setInstallationData] = useState([0, 0, 0, 0, 0, 0]);
  const [MobilizationData, setMobilizationData] = useState([0, 0, 0]);
  const [XAxisDaysLabel, setxAxisDaysLabel] = useState([]);
  const [WeeklyProgressData, setweeklyProgressData] = useState([]);
  const [CompletedSites, setcompletedSites] = useState([]);

  const [dropdownValue, setDropdownValue] = useState('All Sub Projects');
  const [projectNameDropdownValue, setProjectNameDropdownValue] = useState('All Mobitel Projects');

  // ----------------------------------------------------------------------------------------------------------
  const fetchSpecialTag = async () => {
    const req = await axiosInstance.get('/specialTag').then((res) => {
      setSpecialTag(res.data.specialTaArrayForSelectMenus);
    });
  };
  const AllSubProjects = [{ value: 'All Sub Projects', label: 'All Sub Projects' }];
  const specialTags = AllSubProjects.concat(specialTag);
  // ----------------------------------------------------------------------------------------------------------
  const fetchProjectNames = async () => {
    const req = await axiosInstance
      .get('/mobitelProjectsOverviewTable/ProjectsArray')
      .then((res) => {
        setprojectNamesArray(res.data.mobitelProjectsNamesArrayForInsights);
      });
  };

  const fetchData = async () => {
    const req = await axiosInstance
      .get('/mobitelProjectsSubProjects', {
        params: { Special_Tag: dropdownValue, Project: projectNameDropdownValue }
      })
      .then((res) => {
        setChartDatForColumnGraph(res.data.chartDataForFrontEnd);
        setXaxisData(res.data.XaxisDataForTheGraphs);
        setWidthdrawnDataforSquares(res.data.WidthdrawnDataforSquares);
        setHandoverData(res.data.HandOverDataToSquares);
        sePATPassData(res.data.PatDataForFrontEnd);
        setHoldSitesData(res.data.HoldSitesDataforSquares);
        setOnAirData(res.data.OnAirDataForFrontEnd);
        setProjectCompletion(res.data.ProjectCompletionForFrontEnd);
        setSitesOnAir(res.data.sitesOnAirDataForFrontEnd);
        setPatCompletionData(res.data.patCompletionDataForFrontEnd);
        setSARData(res.data.sarDataForFrontEnd);
        setCommissioningData(res.data.commissioningDataForFrontEnd);
        setInstallationData(res.data.installationDataForFrontEnd);
        setMobilizationData(res.data.mobilizeDataforFrontEnd);
        setxAxisDaysLabel(res.data.SevenDaysOfWeek);
        setweeklyProgressData(res.data.weeklyProgressDataForFrontEnd);
        setcompletedSites(res.data.WeeklyProgressOnAirSitesData);
      });
  };

  const fetchScopeData = async () => {
    const req = await axiosInstance
      .get('/mobitelProjectsScopeData', {
        params: { Special_Tag: dropdownValue, ProjectName: projectNameDropdownValue }
      })
      .then((res) => {
        setScopeData(res.data.scopeDataToTheFrontEnd);
      });
  };

  useEffect(() => {
    fetchScopeData();
    fetchSpecialTag();
    fetchData();
    fetchProjectNames();
  }, [dropdownValue]);

  useEffect(() => {
    fetchScopeData();
    fetchSpecialTag();
    fetchData();
    fetchProjectNames();
  }, [projectNameDropdownValue]);

  // ----------------------------------------------------------------------------------------------------------
  const projectNames = projectNamesArray;

  // ----------------------------------------------------------------------------------------------------------
  // ----------------------------------------------------------------------------------------------------------
  const handleChangeSpecialTag = (event) => {
    setDropdownValue(event.target.value);
  };

  const handleChangeProjectName = (event) => {
    setProjectNameDropdownValue(event.target.value);
  };

  //  ---------------------------------------------------------------------------------------------------------------------------
  //  ---------------------------------------------------------------------------------------------------------------------------
  return (
    <Page title="Mobitel Sub Projects | Projects Management Database System">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h6" gutterBottom>
            Mobitel Sub Projects
          </Typography>
          <Typography variant="h9" gutterBottom />
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="caption1">Select Keyword</Typography>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={1}
            mb={0}
          >
            <TextField
              style={{ float: 'right' }}
              sx={{ width: 200 }}
              size="small"
              id="outlined-select-currency"
              select
              value={dropdownValue}
              onChange={handleChangeSpecialTag}
            >
              {specialTags.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              style={{ float: 'right' }}
              sx={{ width: 200 }}
              size="small"
              id="outlined-select-currency"
              select
              value={projectNameDropdownValue}
              onChange={handleChangeProjectName}
            >
              {projectNames.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="top" mb={0}>
          <Typography variant="h6" gutterBottom />
        </Stack>
      </Container>
      <Container maxWidth="xl">
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={2.4}>
            <AppWeeklySales scopeData={ScopeData} />
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <AppBugReports1 handoverData={HandoverData} />
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <AppItemOrders patData={PATPassData} />
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <AppNewUsers onAirData={OnAirData} />
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <AppBugReports holdData={HoldSitesData} />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits chartData={ChartDatForColumnGraph} xaxisData={XaxisData} />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits projectCompletion={ProjectCompletion} />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits0 sitesOnAir={SitesOnAir} />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits1 patCompletionData={PatCompletionData} />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits2 sarData={SARData} />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits3 commissioningData={CommissioningData} />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <AppCurrentVisits4 installationData={InstallationData} />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits5 mobilizationData={MobilizationData} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits1
              xAxisDaysLabel={XAxisDaysLabel}
              weeklyProgressData={WeeklyProgressData}
              completedSites={CompletedSites}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
