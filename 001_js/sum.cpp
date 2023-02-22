#include<stdio.h>
#include<iostream>
void main()
{
    int ch = 1 ,a,b;
    do
    {
        cout <<"\n 1.addition";
        cout <<"\n 2.subtraction";
        cout <<"\n 3.Multiplication";
        cout <<"\n 4.division";
        cout <<"\n 5.modul";
        cout <<"\n 6.exit";
        cout <<"\n Enter your choice:"<<ch;
        switch (ch)
        {
        case 1:
            cout<<"The addition of both value is  "<<a+b;
            break;
        case 2:
            cout<<"The addition of both value is  "<<a-b;
            break;
        
        
        }
    } while (ch!=6);
    
   
}