<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateDataRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "username" => "string|max:255",
            "email" => "required|email",
            "password" => "required|min:8"
        ];
    }

    public function messages(): array
    {
        return [
            "email.required" => "Your email is required!",
            "password.required" => "Your password is required!",
        ];
    }

    public function attributes(): array
    {
        return [
            "email" => "Email Address"
        ];
    }
}
