import { Link as RouterLink } from 'react-router-dom';
import { Grid, Link } from '@mui/material';
import VendorProjects from './VendorProjects';
import MobitelProjects from './MobitelProjects';
// ----------------------------------------------------------------------
export default function CardLists() {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={6} md={2.4}>
        <Link
          underline="none"
          component={RouterLink}
          to="/dashboard/DatabasesUpload/ProjectFiles/VendorProjects"
        >
          <VendorProjects />
        </Link>
      </Grid>
      <Grid item xs={12} sm={6} md={2.4}>
        <Link
          underline="none"
          component={RouterLink}
          to="/dashboard/DatabasesUpload/ProjectFiles/MobitelProjects"
        >
          <MobitelProjects />
        </Link>
      </Grid>
    </Grid>
  );
}
