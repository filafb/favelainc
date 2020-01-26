import Enzyme from "enzyme"
import EnzymeAdapter from "enzyme-adapter-react-16"
import AxiosMockAdapter from "axios-mock-adapter"
import axios from "axios"
Enzyme.configure({ adapter: new EnzymeAdapter() })

const mock = new AxiosMockAdapter(axios)

// examples how to use mock:
// mock.onGet('/api/puppies').reply(200, puppies)
// mock.onGet(`/api/puppies/${puppy.id}`).reply(200, puppy)
// mock.onPost('/api/puppies').reply(201, newPuppy)
