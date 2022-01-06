import { Component, OnInit } from '@angular/core';
import { GraphService } from './gql-test.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private gql : GraphService) { }

  ngOnInit() {
  }

  testingGQL(){
    // ---------- testing mutation

    let mutationBody = {mutation :`mutation exampleMutation{
      signIn(input: { 
        email: "mohammadnasirbaloch@gmail.com",
        password: "password"
      }) {
        token
        name
        id
        email
        error
      }
    }`}
    this.gql.mutate(mutationBody).subscribe(
      data => {
        console.log('mutation response', data);
 
      },
      error => {
          console.log('error', error);
      });

    // ----- testing query
    let queryBody = {
      query : `query getAllPosts {
        posts {
          userId
          id
          title
          body
        }
      }`
    }
    this.gql.query(queryBody).subscribe(
      data => {
        console.log('query response', data);
 
      },
      error => {
          console.log('error', error);
      });

    // ----- testing query with id for single record
    let querySingleBody = {
      query : `query singleParentProduct(
        $id: Int!
      ) {
        post(id: $id){
          userId,
          id
          title
          body
        }
      }`,
      variables: {
        id: 1
      }
    }
    this.gql.query(querySingleBody).subscribe(
      data => {
        console.log('single query response', data);
 
      },
      error => {
          console.log('error', error);
      });
  }

}

