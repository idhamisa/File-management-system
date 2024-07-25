<template>
  <div id="app">
    <h1>Data Table</h1>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Status</th>
            <th>Site ID</th>
            <th>Site Name</th>
            <th>Address</th>
            <th>Zone</th>
            <th>Subdistrict</th>
            <th>District</th>
            <th>State</th>
            <th>Post Code</th>
            <th>Country</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Structure Type</th>
            <th>Structure Height</th>
            <th>Handover</th>
            <th>Active</th>
            <th>Dismantled</th>
            <th>Land Expiry</th>
            <th>Expiry Days</th>
            <th>Assets</th>
            <th>Sharers</th>
            <th>Exclude Sharers</th>
            <th>Util Sharers</th>
            <th>Cabins</th>
            <th>Outdoors</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in data" :key="index">
            <td>{{ item.id }}</td>
            <td>{{ item.status }}</td>
            <td>{{ item.siteId }}</td>
            <td>{{ item.siteName }}</td>
            <td>{{ item.address }}</td>
            <td>{{ item.zone }}</td>
            <td>{{ item.subdistrict }}</td>
            <td>{{ item.district }}</td>
            <td>{{ item.state }}</td>
            <td>{{ item.postCode }}</td>
            <td>{{ item.country }}</td>
            <td>{{ item.latitude }}</td>
            <td>{{ item.longitude }}</td>
            <td>{{ item.structureType }}</td>
            <td>{{ item.structureHeight }}</td>
            <td>{{ item.handover }}</td>
            <td>{{ item.active }}</td>
            <td>{{ item.dismantled }}</td>
            <td>{{ item.landExpiry }}</td>
            <td>{{ item.expiryDays }}</td>
            <td>{{ item.assets }}</td>
            <td>{{ item.sharers }}</td>
            <td>{{ item.excludeSharers }}</td>
            <td>{{ item.utilSharers }}</td>
            <td>{{ item.cabins }}</td>
            <td>{{ item.outdoors }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      data: [
        // Example data, replace with your actual data source
        {
          id: 123,
          status: 'active',
          siteId: 'A456',
          siteName: 'Melaka District',
          address: '123 Main Street, Cityville',
          zone: 'Zone 1',
          subdistrict: 'Central',
          district: 'City Center',
          state: 'Stateville',
          postCode: '12345',
          country: 'Countryland',
          latitude: 37.7749,
          longitude: -122.4194,
          structureType: 'Tower',
          structureHeight: 150.5,
          handover: '2023-06-01',
          active: true,
          dismantled: false,
          landExpiry: '2023-06-01',
          expiryDays: 730,
          assets: 'Equipment A, Equipment B',
          sharers: 'Company X, Company Y',
          excludeSharers: 'Company Z',
          utilSharers: 'Company A, Company B',
          cabins: 'Cabin 1, Cabin 2',
          outdoors: 'Yes'
        }
        // Add more data objects as needed
      ]
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px; /* Adjusted margin for better fit */
}

.table-container {
  overflow-x: auto; /* Allows horizontal scrolling if needed */
  margin: 0 auto; /* Centers the table */
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 0 auto;
  font-size: 12px; /* Smaller font size to fit the content */
}

th, td {
  border: 1px solid #ddd;
  padding: 4px; /* Smaller padding to reduce row height */
}

th {
  background-color: #f2f2f2;
  text-align: left;
  font-weight: bold;
}
</style>
