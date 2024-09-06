import React, { useState, useEffect } from 'react';
import { TextField ,Button,  Container, Grid, InputLabel , IconButton, Autocomplete } from '@mui/material';
import '../../App.css'
import { useNavigate, useParams } from 'react-router-dom';
import { getApi, handleSubmit, handleUpdate } from '../../apis/AgitatorApi';
import { PDFDownloadLink,Image,Document, Page, Text, View, StyleSheet, Svg, Path } from '@react-pdf/renderer';
import Logo from '../../assets/Picture1.png'


// Define styles for PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 30,
    fontFamily: 'Helvetica',
  },
  section: {
    margin: 10,
    padding: 10,
    border: 1,
    borderRadius: 5,
  },
  table: {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid black',
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  tableCellHeader: {
    fontSize: 12,
    fontWeight: 500,
    flex: 1,
    padding: 5,
  },
  tableCell: {
    fontSize: 12,
    flex: 1,
    padding: 5,
  },
  header: {
    fontSize: 18,
    textAlign: 'center',
    padding: 5,
    borderWidth: 1,
  },
  title: {
    fontSize: 18,
    marginLeft: 20,
    fontWeight:500 
  },
  logoImg: {
    width: 40, // Set a fixed width for the logo
    height: 40, // Set a fixed height for the logo
  },
  compDetails: {
    flexDirection: 'row', // Set to row to align items horizontally
    justifyContent: 'flex-start', // Align children to the start
    alignItems: 'center', // Vertically center the children
    marginBottom: 20,
    border:'1px solid black',
    padding:'10px',
    marginLeft:15,
    flexWrap:'wrap',
    borderRadius:'8px',
    maxWidth:'95%'
  },
  compSec:{
    display:'flex',
    flexDirection:'column'
  },
  compDesc:{
    fontSize:11,
    fontWeight:450,
    marginLeft:22,
    marginTop:6
  }
});

export default function AgitatorSeal() {

  const navigate = useNavigate();
  let {aId} = useParams();
  const costReq = ['true', 'false'];


  const [formData, setFormData] = useState({
    branch: "",
    customerName: "",
    customerAddress: "",
    costingRequirement: true,
    enquiryNumber: "",
    refDrawingNumber: "",
    make: "",
    model: "",
    tagNo: "",
    type: "",
    entry: "",
    existingMake: "",
    existingSeries: "",
    existingPerformance: "",
    proposedSealSeries: "",
    proposedSealSize: "",
    vesselOperatingPR: "",
    vesselDesignPR: "",
    speed: "",
    temperature: "",
    directionOfRotation: "",
    vesselOperatingTemperature: "",
    padPlate: "",
    vesselDesignTemperature: "",
    fluid: "",
    fluidTemperature: "",
    boilPoint: "",
    grainSize: "",
    nature: "",
    spGravity: "",
    viscosity: "",
    percentageOfSolid: "",
    freezePoint: "",
    description: ""
  });
  
  

   useEffect(()=>{
    if(aId!==undefined){
      getApi(aId,setFormData)

    }else{
      setFormData(
        {
            // Agitator seal
            branch: "",
            customerName: "",
            customerAddress: "",
            costingRequirement: false,
            enquiryNumber: "",

            // General
            refDrawingNumber: "",

        // Agitor data
            make: "",
            model: "",
            tagNo: "",
            type: "",
            entry: "",

            // Not found 
            existingMake: "",
            existingSeries: "",
            existingPerformance: "",
            proposedSealSeries: "",
            proposedSealSize: "",
            vesselOperatingPR: "",
            vesselDesignPR: "",

            
            speed: "",
            temperature: "",
            directionOfRotation: "",
            vesselOperatingTemperature: "",
            padPlate: "",
            vesselDesignTemperature: "",
            fluid: "",
            fluidTemperature: "",
            boilPoint: "",
            grainSize: "",
            nature: "",
            spGravity: "",
            viscosity: "",
            percentageOfSolid: "",
            freezePoint: "",
            description: ""
              
          })
    } 
  },[aId])



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };



  const cancelUpdate = ()=>{

      const confirmCancel = window.confirm("Are you sure you want to cancel the update?");
   // If user confirms, navigate to the home page and reload the window
  if (confirmCancel) {
    navigate('/');
    window.location.reload();
  }
  }


  // PDF Component
  const PDFFile = ({ formData }) => (
    <Document>
      <Page size="A4" style={styles.page}>

      <View style={styles.compDetails}> 
      <Image style={styles.logoImg} src={Logo} alt = "logo" />
      <View style={styles.compSec}> 
        <Text style={styles.title}>Agitator Seal Information</Text>
        <Text style={styles.compDesc}>Leak-Proof® Engineering Pvt. Ltd.</Text>
        </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.header}>General Information</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellHeader}>Branch</Text>
              <Text style={styles.tableCell}>{formData.branch || 'N/A'}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellHeader}>Customer Name</Text>
              <Text style={styles.tableCell}>{formData.customerName || 'N/A'}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellHeader}>Customer Address</Text>
              <Text style={styles.tableCell}>{formData.customerAddress || 'N/A'}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellHeader}>Costing Requirement</Text>
              <Text style={styles.tableCell}>{String(formData.costingRequirement)}</Text>
            </View>
          </View>
  
          <Text style={styles.header}>Agitator Data</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellHeader}>Make</Text>
              <Text style={styles.tableCell}>{formData.make || 'N/A'}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellHeader}>Model</Text>
              <Text style={styles.tableCell}>{formData.model || 'N/A'}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellHeader}>Tag No</Text>
              <Text style={styles.tableCell}>{formData.tagNo || 'N/A'}</Text>
            </View>
          </View>
  
          <Text style={styles.header}>Operation Parameters</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellHeader}>Proposed Seal Series</Text>
              <Text style={styles.tableCell}>{formData.proposedSealSeries || 'N/A'}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellHeader}>Proposed Seal Size</Text>
              <Text style={styles.tableCell}>{formData.proposedSealSize || 'N/A'}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellHeader}>Pad Plate</Text>
              <Text style={styles.tableCell}>{formData.padPlate || 'N/A'}</Text>
            </View>
          </View>
          </View>
        </Page>
      </Document>
  );
  
 
  return (
      <Container className="container">
        <form >
          <div className='card'>
        {!aId ? <h1 >Agitator Seal</h1> : <h1>Update Agitator Seal :</h1>}
            {/* <h3>Agitator Seal:-</h3> */}
            <div className="MuiBox-root css-2e6lci" style={{marginTop:'1rem'}}><svg width="18" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle "><g><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></g></svg><div class="MuiBox-root css-1isemmb">Agitator Seal:-</div></div>
            <Grid container spacing={3}>
              {aId &&
                <Grid item xs={4}>
                  {/* <InputLabel className="ip-label">Agitator Drf Number</InputLabel> */}
                  <TextField
                    size="small"
                    className="custom-text-field"
                    name="agitatorSealDrfNumber"
                    value={formData.agitatorSealDrfNumber}
                    onChange={handleChange}
                    label="Agitator Drf Number"
                    InputLabelProps={{
                      shrink: Boolean(formData.agitatorSealDrfNumber),
                    }}
                    autoFocus={!formData.agitatorSealDrfNumber} // Autofocus if the value exists
                    />
                </Grid>
              }
              <Grid item xs={4}>
                {/* <InputLabel className="ip-label">Branch</InputLabel> */}
                <TextField
                size="small"
                  className="custom-text-field"
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  label="Branch"
                />
              </Grid>
              <Grid item xs={4}>
                {/* <InputLabel className="ip-label">Customer</InputLabel> */}
                <TextField
                size="small"
                  className="custom-text-field"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  label="Customer"
                />
              </Grid>
              <Grid item xs={4}>
                {/* <InputLabel className="ip-label">Customer Address</InputLabel> */}
                <TextField
                size="small"
                  className="custom-text-field"
                  name="customerAddress"
                  value={formData.customerAddress}
                  onChange={handleChange}
                  label="Customer Address"
                />
              </Grid>
              <Grid item xs={4}>
    {/* <InputLabel className="ip-label" >Transport</InputLabel > */}
  <Autocomplete
    size="small"
    value={formData.costingRequirement || ''}
    onChange={(event, newValue) => {
      setFormData({
        ...formData,
        costingRequirement: newValue || ''
      });
    }}

    inputValue={formData.costingRequirement || ''}
    onInputChange={(event, newInputValue) => {
      setFormData({
        ...formData,
        costingRequirement: newInputValue || ''
      });
    }}

    options={costReq.map((src) => src)}
    renderInput={(params) => (
      <TextField
        {...params}
        size="small"
        variant="outlined"
        placeholder='select Costing Requirement'
        fullWidth
        className='custom-text-field'
        label="Costing Requirement"
      />
    )}
  />
  </Grid>


            </Grid>
      
             {/* <h3>General</h3> */}
             <div className="MuiBox-root css-2e6lci"><svg width="18" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle "><g><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></g></svg><div class="MuiBox-root css-1isemmb">General:-</div></div>
            <Grid container spacing={2}>
              <Grid item xs={4}>      
                  {/* <InputLabel className="ip-label" >Ref Dwg No</InputLabel > */}
                <TextField
                size="small"
                  className="custom-text-field"
                  name="refDrawingNumber"
                  value={formData.refDrawingNumber}
                  onChange={handleChange}
                   label="Ref Dwg No" 
                  />
              </Grid>
   </Grid>

           {/* <h3>Agitator Data</h3> */}
           <div className="MuiBox-root css-2e6lci"><svg width="18" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle "><g><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></g></svg><div class="MuiBox-root css-1isemmb">Agitator Data:-</div></div>
           
          <Grid container spacing={2}>
            <Grid item xs={4}>      
                {/* <InputLabel className="ip-label" >Make</InputLabel > */}
              <TextField
              size="small"
                className="custom-text-field"
                name="make"
                value={formData.make}
                onChange={handleChange}
                 label="Make" 
                />
            </Grid>

  {/* Existing text fields (replace with your previous code) */}
  <Grid item xs={4}>
    {/* <InputLabel className="ip-label">Model</InputLabel> */}
    <TextField
    size="small"
      className="custom-text-field"
      name="model"
      value={formData.model}
      onChange={handleChange}
      label="Model"
    />
  </Grid>

  <Grid item xs={4}>
    {/* <InputLabel className="ip-label">Tag No</InputLabel> */}
    <TextField
    size="small"
      className="custom-text-field"
      name="tagNo"
      value={formData.tagNo}
      onChange={handleChange}
      label="Tag No"
    />
  </Grid>
  <Grid item xs={4}>
    {/* <InputLabel className="ip-label">Entry</InputLabel> */}
    <TextField
    size="small"
      className="custom-text-field"
      name="entry"
      value={formData.entry}
      onChange={handleChange}
      label="Entry"
    />
  </Grid>
 </Grid>

            {/* <h3>Operation Parameters</h3> */}
            <div className="MuiBox-root css-2e6lci"><svg width="18" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle "><g><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></g></svg><div class="MuiBox-root css-1isemmb">Operation Parameters:-</div></div>
            <Grid container spacing={2}>
            <Grid item xs={4}>      
                {/* <InputLabel className="ip-label">percentage of soil</InputLabel > */}
              <TextField
              size="small"
                className="custom-text-field"
                name="percentageOfSolid"
                value={formData.percentageOfSolid}
                onChange={handleChange}
                label="percentage of soil"
                />
            </Grid>

            <Grid item xs={4}>      
                {/* <InputLabel className="ip-label">Proposed Seal Series</InputLabel > */}
              <TextField
              size="small"
                className="custom-text-field"
                name="proposedSealSeries"
                value={formData.proposedSealSeries}
                onChange={handleChange}
                 label="Proposed Seal Series" 
                />
            </Grid>

            <Grid item xs={4}>      
                {/* <InputLabel className="ip-label">Propsed Seal Size</InputLabel > */}
              <TextField
              size="small"
                className="custom-text-field"
                name="proposedSealSize"
                value={formData.proposedSealSize}
                onChange={handleChange}
                 label="Propsed Seal Size" 
                />
            </Grid>


            <Grid item xs={4}>      
                {/* <InputLabel className="ip-label">Pad Plate</InputLabel > */}
              <TextField
              size="small"
                className="custom-text-field"
                name="padPlate"
                value={formData.padPlate}
                onChange={handleChange} 
                 label="Pad Plate" 
                />
            </Grid>

            </Grid>
         
            {/* <h3>MOC</h3> */}
            <div className="MuiBox-root css-2e6lci"><svg width="18" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle "><g><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></g></svg><div class="MuiBox-root css-1isemmb">MOC:-</div></div>
            <Grid container spacing={2}>
            <Grid item xs={4}>
            {/* <InputLabel className="ip-label">Temprature</InputLabel> */}
            <TextField
            size="small"
              className="custom-text-field"
              name="temperature"
              value={formData.temperature}
              onChange={handleChange}
              label="Temprature"
            />
          </Grid>
          <Grid item xs={4}>
            {/* <InputLabel className="ip-label">Speed</InputLabel> */}
            <TextField
            size="small"
              className="custom-text-field"
              name="speed"
              value={formData.speed}
              onChange={handleChange}
              label="Speeed"
            />
          </Grid>
          <Grid item xs={4}>
            {/* <InputLabel className="ip-label">Vessel Designer PR</InputLabel> */}
            <TextField
            size="small"
              className="custom-text-field"
              name="vesselDesignPR"
              value={formData.vesselDesignPR}
              onChange={handleChange}
              label="Vessel Designer PR"
            />
          </Grid>
   
    <Grid item xs={4}>
    {/* <InputLabel className="ip-label">Vessel Design Temperature</InputLabel> */}
    <TextField
    size="small" // Consider using Dropdown for options if applicable
      className="custom-text-field"
      name="vesselDesignTemperature"
      value={formData.vesselDesignTemperature}
      onChange={handleChange}
      label="Vessel Design Temperature"
    />
  </Grid>
  <Grid item xs={4}>
    {/* <InputLabel className="ip-label">Vessel Operating PR</InputLabel> */}
    <TextField
    size="small" // Consider using number input type
      className="custom-text-field"
      name="vesselOperatingPR"
      value={formData.vesselOperatingPR}
      onChange={handleChange}
      type="number" // Optional: number input type for area values
      label="Vessel Operating PR"
    />
  </Grid>
  <Grid item xs={4}>
    {/* <InputLabel className="ip-label">Vessel Operating Temperature</InputLabel> */}
    <TextField
    size="small" // Consider using Dropdown for options if applicable
      className="custom-text-field"
      name="vesselOperatingTemperature"
      value={formData.vesselOperatingTemperature}
      onChange={handleChange}
      label="Vessel Operating Temperature"
    />
  </Grid>

      </Grid>
      </div>

          <Grid item xs={4}>
          <Grid item xs={4}>
        
        {!aId ?( <Button className="submit-btn" type="submit" onClick ={(e)=>handleSubmit(e,formData,navigate)} variant="contained" >Submit</Button>) : (
          <>
            <Button className="update-btn" variant="contained" onClick={(e)=>handleUpdate(e,formData,navigate,aId)} >Update</Button>
            <Button className="cancel-btn"  variant="contained" onClick={cancelUpdate} >Cancel</Button> </>)}
          </Grid>
        </Grid>
        <Grid container justifyContent="flex-end" style={{ marginTop: '20px' }}>
        <PDFDownloadLink document={<PDFFile formData={formData} />} fileName="AgitatorSeal.pdf">
          {({ loading }) => (loading ? 'Loading document...' : 'Download PDF')}
        </PDFDownloadLink>
        </Grid>
      </form>
    </Container>
  );

}



