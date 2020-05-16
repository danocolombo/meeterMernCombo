
class SomeComponent extends React.component {
    constructor() {
      super();
  
      this.state = {
        existingGroups: []
      }
    }
  
    componentDidMount() {
      // fetch the project name, once it retrieves resolve the promsie and update the state. 
      this.getExistingGroups().then(result => this.setState({
        existingGroups: result
      }))
    }
  
    getExistingGroups() {
      // replace with whatever your api logic is.
      const mid = '5eb87420c29f0b5ac02ad73d';
      const res = getGroups(mid);

      return res()
    }
  
  
    render() {
  
      return ([
        <h2>Just maybe</h2>

      ])
    }
   }