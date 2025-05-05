export const codeSnippets: { [key: string]: string[] } = {
  javascript: [
    // Simple Function
    `function calculateSum(a, b) {
  return a + b;
}`,
    // Array Methods
    `const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(num => num * 2);
const sum = numbers.reduce((total, current) => total + current, 0);
console.log(doubled, sum);`,
    // DOM Manipulation
    `document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('#submit-btn');
  button.addEventListener('click', (e) => {
    e.preventDefault();
    const input = document.querySelector('#user-input').value;
    document.querySelector('#result').textContent = \`You typed: \${input}\`;
  });
});`,
    // Async Function
    `async function fetchUserData(userId) {
  try {
    const response = await fetch(\`https://api.example.com/users/\${userId}\`);
    if (!response.ok) {
      throw new Error(\`HTTP error! Status: \${response.status}\`);
    }
    const data = await response.json();
    return {
      name: data.name,
      email: data.email,
      isActive: data.status === 'active'
    };
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    return null;
  }
}`
  ],
  python: [
    // Simple Function
    `def calculate_average(numbers):
    if not numbers:
        return 0
    return sum(numbers) / len(numbers)`,
    // List Comprehension
    `numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
even_numbers = [num for num in numbers if num % 2 == 0]
squared = [num ** 2 for num in even_numbers]
print(f"Even numbers: {even_numbers}")
print(f"Squared: {squared}")`,
    // File Handling
    `def read_and_process_file(filename):
    try:
        with open(filename, 'r') as file:
            lines = file.readlines()
            processed = [line.strip().upper() for line in lines if line.strip()]
            return processed
    except FileNotFoundError:
        print(f"Error: File '{filename}' not found.")
        return []
    except Exception as e:
        print(f"An error occurred: {e}")
        return []`,
    // API Request
    `import requests
import json
from datetime import datetime

def fetch_weather_data(city, api_key):
    base_url = "https://api.openweathermap.org/data/2.5/weather"
    params = {
        "q": city,
        "appid": api_key,
        "units": "metric"
    }
    
    try:
        response = requests.get(base_url, params=params)
        response.raise_for_status()
        
        data = response.json()
        weather = {
            "city": city,
            "temperature": data["main"]["temp"],
            "description": data["weather"][0]["description"],
            "humidity": data["main"]["humidity"],
            "wind_speed": data["wind"]["speed"],
            "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }
        
        return weather
    except requests.exceptions.HTTPError as http_err:
        print(f"HTTP error occurred: {http_err}")
    except Exception as err:
        print(f"An error occurred: {err}")
    
    return None`
  ],
  csharp: [
    // Simple Method
    `public static int CalculateSum(int[] numbers)
{
    int sum = 0;
    foreach (int num in numbers)
    {
        sum += num;
    }
    return sum;
}`,
    // LINQ Query
    `using System;
using System.Linq;
using System.Collections.Generic;

public class Program
{
    public static void Main()
    {
        List<int> numbers = new List<int> { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
        var evenNumbers = numbers.Where(n => n % 2 == 0).ToList();
        var squared = evenNumbers.Select(n => n * n).ToList();
        
        Console.WriteLine($"Even numbers: {string.Join(", ", evenNumbers)}");
        Console.WriteLine($"Squared: {string.Join(", ", squared)}");
    }
}`,
    // File Handling
    `using System;
using System.IO;
using System.Collections.Generic;

public static List<string> ReadAndProcessFile(string filePath)
{
    List<string> processedLines = new List<string>();
    
    try
    {
        string[] lines = File.ReadAllLines(filePath);
        foreach (string line in lines)
        {
            if (!string.IsNullOrWhiteSpace(line))
            {
                processedLines.Add(line.Trim().ToUpper());
            }
        }
    }
    catch (FileNotFoundException)
    {
        Console.WriteLine($"Error: File '{filePath}' not found.");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"An error occurred: {ex.Message}");
    }
    
    return processedLines;
}`
  ]
};