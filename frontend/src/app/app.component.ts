import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  examplePlants = [];


  ngOnInit() {   
    this.selectAll();
  }

  async selectAll() {
    try {
      console.log(environment.readAll);
      console.log('calling read all endpoint');

      this.examplePlants = [];
      const output = await fetch(environment.readAll);
      const outputJSON = await output.json();
      this.examplePlants = outputJSON;
      console.log('Success');
      console.log(outputJSON);
    } catch (error) {
      console.log(error);
    }
  }

  // really this is create but the flow is that
  // click the "create item" button which appends a blank value to the array, then click save to actually create it permanently
  async savePlant(plant: any) {
    try {
      console.log(environment.create);
      console.log('calling create item endpoint with: ' + plant.name);

      const requestBody = {
        id: plant.id,
        name: plant.name,
        description: plant.description,
        health: plant.health
      };

      const createResponse =
        await fetch(environment.create, {
          method: 'POST',
          body: JSON.stringify(requestBody),
          headers:{
            'Content-Type': 'application/json'
          }
        });
      console.log('Success');
      console.log(createResponse.status);

      // call select all to update the table
      this.selectAll();
    } catch (error) {
      console.log(error);
    }
  }

  async updatePlant(plant: any) {
    try {
      console.log(environment.update);
      console.log('calling update endpoint with id ' + plant.id + ' and value "' + plant.name);

      const requestBody = {
        name: plant.name,
        description: plant.description,
        health: plant.health
      };

      const updateResponse =
        await fetch(environment.update + plant.id, {
          method: 'PUT',
          body: JSON.stringify(requestBody),
          headers:{
            'Content-Type': 'application/json'
          }
        });
      console.log('Success');
      console.log(updateResponse.status);

      // call select all to update the table
      this.selectAll();
    } catch (error) {
      console.log(error);
    }
  }

  async deletePlant(plant: any) {
    try {
      console.log(environment.delete);
      console.log('calling delete endpoint with id ' + plant.id);

      const deleteResponse =
        await fetch(environment.delete + plant.id, {
          method: 'DELETE',
          headers:{
            'Content-Type': 'application/json'
          }
        });

      console.log('Success');
      console.log(deleteResponse.status);

      // call select all to update the table
      this.selectAll();
    } catch (error) {
      console.log(error);
    }
  }

  createPlant() {    

    this.examplePlants.push({
      id: '',
      name: '',
      description: '',
      health: '',
      save: true
    });
  }

}
