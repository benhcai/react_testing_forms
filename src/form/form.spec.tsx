import { act, render, Screen, screen, waitFor, within } from "@testing-library/react"
import {MultiStepForm} from "./form"
import * as submit from "../App"
import user from "@testing-library/user-event"

// const onSubmitMock = jest.spyOn(submit, "onSubmit")



class Get {
    #screen: Screen

    constructor(screen: Screen) {
        this.#screen = screen
    }
    get firstNameInput() {
        return this.#screen.getByRole('textbox', { name: /first name/i });
    }
    get nextButton() {
        return this.#screen.getByRole("button", {name: /next/i})
    }
    get jobSelect() {
        return this.#screen.getByRole("combobox")
    }
    selectJobSituation(jobSituation: string) {
        user.selectOptions(
            this.jobSelect,
            within(this.jobSelect).getByRole("option", {name: jobSituation})
        )
    }
    get cityInput() {
        return this.#screen.getByRole("textbox", {name: /city/i})
    }
    get millonaireCheck() {
        return this.#screen.getByRole('checkbox', {
            name: /i am a millionaire/i
        })
    }
    get moneyInput() {
        return this.#screen.getByRole('spinbutton', {
            name: /all the money i have/i
        })
    }
    get descriptionInput() {
        return this.#screen.getByRole('textbox', {
            name: /description/i
          })
    }
    get submitButton() {
        return this.#screen.getByRole('button', {
            name: /submit/i
          })
    }
}

const get = new Get(screen)

describe("form", () => {
    const mockOnSubmit = jest.fn()
    beforeEach(() => {
        mockOnSubmit.mockClear()
    })
    describe("on the first page", () => {
        test("only renders the fiirst  initially", async () => {
            render(<MultiStepForm onSubmit={mockOnSubmit}/>)
            expect(screen.getAllByText("First Name")).not.toHaveLength(0)
            expect(screen.queryByText("All the money I have")).not.toBeInTheDocument()
            expect(screen.queryByText("Description")).not.toBeInTheDocument()
        })

        test("shows an error if the first name input in empty when next is clicked", async () => {
            render(<MultiStepForm onSubmit={mockOnSubmit}/>)
            user.click(get.nextButton)
            expect(await screen.findByText("Your First Name is Required")).toBeInTheDocument()
        })
    })

    describe("goes to step three", () => {
        test("submits at step 3 with correct arguments", async () => {
            render(<MultiStepForm onSubmit={mockOnSubmit}/>)

            // STEP 1
            user.type(get.firstNameInput, "abcdef")
            expect(await screen.findByDisplayValue("abcdef")).toBeInTheDocument()
            get.selectJobSituation("Full-Time")
            user.type(get.cityInput, "cccccyyy")
            user.click(get.millonaireCheck)
            user.click(get.nextButton)
        
            // STEP 2
            expect(await screen.findAllByText("All the money I have")).not.toHaveLength(0)
            user.type(get.moneyInput, "9999999")
            user.click(get.nextButton)

            // STEP 3
            expect(await screen.findAllByText("Description")).not.toHaveLength(0)
            user.type(get.descriptionInput, "hello mate")
            user.click(get.submitButton)

            await waitFor(() => {expect(mockOnSubmit).toHaveBeenCalledTimes(1)})
            await waitFor(() => {
                expect(mockOnSubmit).toHaveBeenCalledWith({
                    city: 'cccccyyy',
                    description: 'hello mate',
                    firstName: 'abcdef',
                    job: 'FULL',
                    millionaire: true,
                    money: 9999999,
                })
            })
        })
    })
})
